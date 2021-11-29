import React, { createContext, MutableRefObject, ReactNode, useContext, useEffect } from 'react';
import { useParams } from 'react-router';

import { Game } from './models/game';
import { useGame } from './useGame';

export interface GameContextObject {
    game: Game;
    isUserOwnerOfGame: boolean;
}

export const GameManagerContext = createContext<GameContextObject>({} as GameContextObject);

export function useGameContext(): GameContextObject {
    return useContext(GameManagerContext);
}

interface GameContextProviderProps {
    children: ReactNode | ReactNode[];
}

export function GameContextProvider({children}: GameContextProviderProps) {
    const { gameId } = useParams();
    const { game, isUserOwnerOfGame } = useGame(gameId);

    useEffect(() => {
        console.log('The game we are playing has changed', game);
    }, [game]);

    const GameContextObject: GameContextObject = {
        game,
        isUserOwnerOfGame,
    }

    return (
        <GameManagerContext.Provider value={GameContextObject}>
            {children}
        </GameManagerContext.Provider>
    )
}