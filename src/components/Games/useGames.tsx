import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, query, where } from '@firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { useAuth } from '../../Utils/auth/auth.context';
import { Game } from './models/game';
import { IGame } from './models/IGame';

const gamesPath = 'games';

export function useGames() {
    const {user} = useAuth();

    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        if (Boolean(user)) {
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
    
            return () => {unsub()};
        }
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
        const db = getFirestore();

        deleteDoc(doc(db, `${gamesPath}/${gameId}`));
        deleteDoc(doc(db, `gameObjectsInScene/${gameId}`));
        deleteDoc(doc(db, `gamePlayersInScene/${gameId}`));
        deleteDoc(doc(db, `gameObjects/${gameId}`));

        const storage = getStorage();
        const assetIds = await (await getDocs(collection(db, `gameAssets/${gameId}/assets`))).docs.map((doc) => doc.id);
        
        assetIds.forEach((assetId) => {
            const storageRef = ref(storage, `${gameId}/${assetId}`);
            deleteObject(storageRef);
        });

        
        deleteDoc(doc(db, `gameAssets/${gameId}`));
    }

    return {games, createGame, updateGame, deleteGame};
}