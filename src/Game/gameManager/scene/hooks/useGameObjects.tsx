import { collection, getFirestore, onSnapshot } from '@firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { GameObject } from '../../../../Utils/engine';
import { Vector2 } from '../../../../Utils/engine/models/Vector2';
import { FirestoreImageObject, ImageObject } from '../../../gameObjectTypes/ImageObject';
import { SyncableObject } from '../../../gameObjectTypes/syncableObject';
import { Asset } from '../../assets/models/asset';
import { GameObjectTypes } from '../gameObjectTypes';
import { useScenesGameObjectDetails } from './useScenesGameObjectDetails';

export function useGameObjects(gameId: string, sceneId: string, assets: Asset[]) {
    const {gameObjectSceneDetails} = useScenesGameObjectDetails(gameId, sceneId);

    const [unfinishedGameObjects, setUnfinishedGameObjects] = useState<any[]>([]);

    const gameObjects: GameObject[] = useMemo(() => {
        if (Boolean(gameObjectSceneDetails) && Boolean(unfinishedGameObjects) && Boolean(assets) && Boolean(gameId) && Boolean(sceneId)) {
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
                            const typedUnfinishedGameObject = unfinishedGameObject as FirestoreImageObject;
                            const { image } = assets.find((asset) => asset.assetId === typedUnfinishedGameObject.assetId);
        
                            objectAfterMutationIntoType = new ImageObject({
                                gameObjectId,
                                ...gameObjectDetail,
                                ...typedUnfinishedGameObject,
                                position,
                                image,
                                gameId,
                                sceneId,
                            });
                        };
                    }
                }
    
                return objectAfterMutationIntoType;
            }).filter((gameObject) => gameObject !== undefined);
        }

        return [];
    }, [gameObjectSceneDetails, unfinishedGameObjects, assets, gameId, sceneId]);
    // gameObjectsInScene = useMemo( game objects in current scene (that have detail) );

    useEffect(() => {
        if (Boolean(gameId)) {
            const db = getFirestore();

            const unsub = onSnapshot(collection(db, `gameObjects/${gameId}/gameObjects`), ({docs}) => {
                console.log('Got new list of game objects from server');
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

    function syncGameObject(gameObject: SyncableObject) {
        gameObject.sync();
    }

    return {gameObjects, syncGameObject} as const;
}