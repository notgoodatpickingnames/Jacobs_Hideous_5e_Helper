import { doc, getFirestore, onSnapshot } from '@firebase/firestore';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '../../auth/auth.context';
import { Game } from './models/game';
import { IGame } from './models/IGame';

export function useGame(gameId: string) {
    const { user } = useAuth();
    const [game, setGame] = useState<Game>();
    const [isUserOwnerOfGame, setIsUserOwnerOfGame] = useState<boolean>(false);

    useEffect(() => {
        const db = getFirestore();

        const unsubscribe = onSnapshot(doc(db, 'games', gameId), (doc) => {
            const _game = doc.data() as IGame;
            _game.gameId = doc.id;

            setGame(new Game(_game));
        });

        return () => {unsubscribe()};
    }, [gameId]);

    useEffect(() => {
        if (Boolean(user) && Boolean(game)) {
            setIsUserOwnerOfGame(user.uid === game.ownerId);
        }
    }, [user, game]);

    return { game, isUserOwnerOfGame };
}