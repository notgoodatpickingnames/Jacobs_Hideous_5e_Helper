import { collection, doc, getFirestore, onSnapshot, query } from '@firebase/firestore';
import { where } from 'firebase/firestore';
import { useEffect } from 'react';

export function useCurrentScene(userId: string, gameId: string) {
    // const [currentScene, setCurrentScene]

    useEffect(() => {
        if (Boolean(userId) && Boolean(gameId)) {
            const db = getFirestore();

            const q = query(collection(db, `gameObjects/${gameId}/scenes`), where('playersInScene', 'array-contains', userId));

            const unsub = onSnapshot(q, ({docs}) => {
                docs.map((doc) => doc.data() as I)
            });

            return () => {unsub()};
        }
    }, [userId, gameId]);
}