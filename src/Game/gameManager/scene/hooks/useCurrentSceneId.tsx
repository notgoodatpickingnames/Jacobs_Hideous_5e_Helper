import { doc, getFirestore, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';

export function useCurrentSceneId(userId: string, gameId: string) {
    const [currentSceneId, setCurrentSceneId] = useState<string>('');

    useEffect(() => {
        if (Boolean(userId) && Boolean(gameId)) {
            const db = getFirestore();

            const unsub = onSnapshot(doc(db, `gamePlayersInScene/${gameId}/players/${userId}`), (doc) => {
                const playerScene = doc.data() as {sceneId: string};

                setCurrentSceneId(playerScene?.sceneId);
            });

            return () => {unsub()};
        }
    }, [userId, gameId]);

    return currentSceneId;
}