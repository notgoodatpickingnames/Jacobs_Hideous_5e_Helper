import { collection, documentId, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useMemo } from 'react';

import { useGameManagerContext } from '../../gameManager';

export function usePlayersInGame() {
    const { game } = useGameManagerContext();
    
    const playerIds = useMemo(() => game.players, [game]);

    useEffect(() => {
        const db = getFirestore();
        const q = query(collection(db, 'profiles'), where(documentId(), 'in', playerIds));

        // const unsub = onSnapshot(q, )

        // return () => { unsub(); };
    }, [playerIds]);

    // return players;
}