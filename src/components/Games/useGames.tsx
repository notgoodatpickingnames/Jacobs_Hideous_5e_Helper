import { collection, getFirestore, onSnapshot, query } from '@firebase/firestore';
import { where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAuth } from '../../Utils/auth/auth.context';
import { Game } from './game';
import { IGame } from './IGame';


export function useGames() {
    const {user} = useAuth();

    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const db = getFirestore();
        const q = query(collection(db, 'Games'), where('OwnerId', '==', user.uid));
        
        const unsub = onSnapshot(q, ({docs}) => {
            const games: IGame[] = docs.map((g) => g.data() as IGame);
            setGames(games.map((game) => new Game(game)));
        });

        return () => unsub();
    }, [user]);

    return games;
}