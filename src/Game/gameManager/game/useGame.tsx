import { doc, getFirestore, onSnapshot } from '@firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '../../../Utils/auth/auth.context';
import { Game } from './models/game';
import { IGame } from './models/IGame';

export function useGame(gameId: string) {
    const { user } = useAuth();
    const [game, setGame] = useState<Game>();

    useEffect(() => {
        const db = getFirestore();

        const unsubscribe = onSnapshot(doc(db, 'games', gameId), (doc) => {
            const _game = doc.data() as IGame;
            _game.gameId = doc.id;

            setGame(new Game(_game));
        });

        return () => {unsubscribe();};
    }, [gameId]);

    const isUserOwnerOfGame = useMemo(() => {
        if (Boolean(user) && Boolean(game)) {
            return user.uid === game.ownerId;
        }

        return false;
    }, [user, game]);

    return { game, isUserOwnerOfGame };
}