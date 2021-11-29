import { collection, getFirestore, onSnapshot, setDoc } from '@firebase/firestore';
import { doc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useAuth } from '../../auth/auth.context';
import { useEngine } from '../Engine';
import { Asset } from './models/asset';
import { IAsset } from './models/IAsset';

export function useAssets() {
    const { user } = useAuth();
    const { gameContext } = useEngine();
    const { game, isUserOwnerOfGame } = gameContext;

    const assetsMap = useRef<Map<string, Asset>>(new Map<string, Asset>([]));
    const [assets, setAssets] = useState<Asset[]>();

    useEffect(() => {
        if (Boolean(user) && Boolean(game) && isUserOwnerOfGame) {
            console.log('The user is the owner of the game. Getting all assets', user.uid, game.gameId, isUserOwnerOfGame);
            const db = getFirestore();
            
            const unsub = onSnapshot(collection(db, `gameAssets/${game.gameId}/assets`), ({docs}) => {
                const assets: Asset[] = docs.map((doc) => new Asset(doc.data() as IAsset));
                
                setAssets(assets);
                assets.forEach((asset) => assetsMap.current.set(asset.assetId, asset));
            });

            return () => {unsub()};
        } else {

        }
    }, [user, game, isUserOwnerOfGame]);

    async function addAsset(file: File): Promise<void> {
        const assetId = uuid();

        const downloadUrl = await storeAssetFile(assetId, file);
        const assetToStore = new Asset({name: file.name, assetId: assetId, creatorId: user.uid, source: downloadUrl});
        await storeAsset(assetToStore);
    }

    async function storeAsset(asset: Asset): Promise<void> {
        const db = getFirestore();

        await setDoc(doc(db, `gameAssets/${game.gameId}/assets`, `${asset.assetId}`), {
            creator: user.uid,
            assetId: asset.assetId,
            name: asset.name,
            source: asset.image.src
        });
    }

    async function storeAssetFile(assetId: string, file: File): Promise<string> {
        const storage = getStorage();
        const storageRef = ref(storage, `${game.gameId}/${assetId}`);

        const uploadResult = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(uploadResult.ref);

        return downloadUrl;
    }

    async function getAsset(assetId: string): Promise<Asset> {
        const assetIsDownloaded = Boolean(assetsMap.current.get(assetId));

        if (assetIsDownloaded) {
            return assetsMap.current.get(assetId);
        }

        // need to get both info from asset in firestore and image url from storage;
        const storage = getStorage();
        const storageRef = ref(storage, `${game.gameId}/${assetId}`);

        return undefined;
    }

    return { assets, assetsMap, addAsset, getAsset }
}