import { addDoc, collection, getFirestore, onSnapshot, query } from '@firebase/firestore';
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
            const games: IGame[] = docs.map((doc) => {
                const game = doc.data() as IGame;
                game.gameId = doc.id;

                return game;
            });

            setGames(games.map((game) => new Game(game)).sort((game1, game2) => game2.modifiedOn.getTime() - game1.modifiedOn.getTime()));
        });

        return () => unsub();
    }, [user]);

    async function createGame(name: string): Promise<void> {
        const db = getFirestore();
        
        await addDoc(collection(db, gamesPath), {
            ownerId: user.uid,
            name: name,
            players: [user.uid],
            modifiedOn: new Date(),
        });
    }
    
    async function updateGame(game: Game): Promise<void> {

    }

    async function deleteGame(gameId: string): Promise<void> {

    }

    return {games, createGame, updateGame, deleteGame};
}