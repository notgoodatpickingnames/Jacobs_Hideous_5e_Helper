import { collection, doc, getFirestore, onSnapshot, setDoc } from '@firebase/firestore';
import { useEffect, useMemo, useRef, useState } from 'react';

import { GameObject } from '../../../../Utils/engine';
import { Vector2 } from '../../../../Utils/engine/models/Vector2';
import { FirestoreImageObject, ImageObject } from '../../../gameObjectTypes/ImageObject';
import { NPCObject } from '../../../gameObjectTypes/npcObject';
import { Asset } from '../../assets/models/asset';
import { GameObjectTypes } from '../gameObjectTypes';
import { useScenesGameObjectDetails } from './useScenesGameObjectDetails';

export function useGameObjects(gameId: string, sceneId: string, assets: Asset[]) {
    const {gameObjectSceneDetails, updateGameObjectSceneDetail} = useScenesGameObjectDetails(gameId, sceneId);

    const [unfinishedGameObjects, setUnfinishedGameObjects] = useState<any[]>([]);

    const gameObjects: GameObject[] = useMemo(() => {
        console.log('Getting Game Objects', gameObjectSceneDetails, unfinishedGameObjects, assets);
        return unfinishedGameObjects.map((unfinishedGameObject) => {
            const gameObjectId = unfinishedGameObject.gameObjectId as string;
            const gameObjectDetail = gameObjectSceneDetails.find((detail) => detail.gameObjectId === gameObjectId);

            // We know that all variations of gameObjects will have a type field for proper mutation.
            const gameObjectType = unfinishedGameObject.type as GameObjectTypes;

            const position = Boolean(gameObjectDetail) ? new Vector2(gameObjectDetail.x, gameObjectDetail.y) : undefined;

            let objectAfterMutationIntoType = undefined;
            
            if (Boolean(gameObjectDetail)) {
                switch (gameObjectType) {
                    case GameObjectTypes.image: {
                        const object = unfinishedGameObject as FirestoreImageObject;
                        const asset = assets.find((asset) => asset.assetId = object.assetId);
    
                        objectAfterMutationIntoType = new ImageObject(gameObjectId, position, gameObjectDetail.width, gameObjectDetail.height, asset.image, asset.assetId, object.name);
                    };
                }
            }

            return objectAfterMutationIntoType;
        }).filter((gameObject) => gameObject !== undefined);
    }, [gameObjectSceneDetails, unfinishedGameObjects, assets]);
    // gameObjectsInScene = useMemo( game objects in current scene (that have detail) );

    useEffect(() => {
        if (Boolean(gameId)) {
            const db = getFirestore();

            const unsub = onSnapshot(collection(db, `gameObjects/${gameId}/gameObjects`), ({docs}) => {
                const unfinishedGameObjects = docs.map((doc) => {
                    const unfinishedObject = doc.data() as any;
                    unfinishedObject.gameObjectId = doc.id;

                    return unfinishedObject;
                });

                setUnfinishedGameObjects(unfinishedGameObjects);
            });

            return () => {unsub()};
        }
    }, [gameId]);

    function createGameObject(gameObject: GameObject | ImageObject | NPCObject) {
        const db = getFirestore();

        if ((gameObject as ImageObject).type === GameObjectTypes.image) {
            const fireStoreImageObject = (gameObject as ImageObject).asFirestoreObject();
            const fireStoreDetailObject = (gameObject as ImageObject).asFirestoreSceneDetailObject();

            setDoc(doc(db, `gameObjects/${gameId}/gameObjects/${gameObject.gameObjectId}`), {
                type: GameObjectTypes.image,
                name: fireStoreImageObject.name,
                assetId: fireStoreImageObject.assetId,
            });

            updateGameObjectSceneDetail(fireStoreDetailObject);
        }
    }

    return {gameObjects, createGameObject} as const;
}