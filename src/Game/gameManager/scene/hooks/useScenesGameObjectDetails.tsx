import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { GameObjectSceneDetail } from '../models/gameObjectSceneDetail';

export function useScenesGameObjectDetails(gameId: string, sceneId: string) {
    const [gameObjectSceneDetails, setGameObjectSceneDetails] = useState<GameObjectSceneDetail[]>([]);

    useEffect(() => {
        if (Boolean(gameId) && Boolean(sceneId)) {
            const db = getFirestore();

            const unsub = onSnapshot(collection(db, `gameObjectsInScene/${gameId}/scenes/${sceneId}/gameObjects`), ({docs}) => {
                const gameObjectDetails = docs.map((doc) => {
                    const detail = doc.data() as GameObjectSceneDetail;
                    detail.gameObjectId = doc.id;

                    return detail;
                });
                
                setGameObjectSceneDetails(gameObjectDetails);
            });

            return () => {unsub()};
        }
    }, [gameId, sceneId]);

    return {gameObjectSceneDetails} as const;
}