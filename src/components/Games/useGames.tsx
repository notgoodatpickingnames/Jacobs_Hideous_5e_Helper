import { collection, doc, getFirestore, onSnapshot, query, setDoc } from '@firebase/firestore';
import { where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAuth } from '../../Utils/auth/auth.context';
import { Game } from './models/game';
import { IGame } from './models/IGame';

const gamesPath = 'games';

export function useGames() {
    const {user} = useAuth();

    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const db = getFirestore();
        const q = query(collection(db, gamesPath), where('players', 'array-contains', user.uid));
        
        const unsub = onSnapshot(q, ({docs}) => {
            const games: IGame[] = docs.map((g) => g.data() as IGame);
            setGames(games.map((game) => new Game(game)));
        });

        return () => unsub();
    }, [user]);

    async function addGame(game: Game): Promise<void> {
        const db = getFirestore();
        
        await setDoc(doc(db, gamesPath), game);
    }
    
    async function updateGame(game: Game): Promise<void> {

    }

    async function deleteGame(gameId: string): Promise<void> {

    }

    return {games, addGame, updateGame, deleteGame};
}