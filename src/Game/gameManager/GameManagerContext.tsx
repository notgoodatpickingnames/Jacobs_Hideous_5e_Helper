import React, { createContext, MutableRefObject, ReactNode, useContext, useEffect } from 'react';
import { useParams } from 'react-router';

import { Asset } from './assets/models/asset';
import { useAssets } from './assets/useAssets';
import { useGame } from './game/useGame';
import { useSceneSync } from './scene/useSceneSync';

export interface GameManagerContextObject {
    addAsset: (file: File) => Promise<void>;
    assets: Asset[];
}

export const GameManagerContext = createContext<GameManagerContextObject>({} as GameManagerContextObject);

export function useGameManagerContext(): GameManagerContextObject {
    return useContext(GameManagerContext);
}

interface GameManagerContextProviderProps {
    children: ReactNode | ReactNode[];
}

export function GameManagerContextProvider({children}: GameManagerContextProviderProps) {
    const { gameId } = useParams();
    const { game, isUserOwnerOfGame } = useGame(gameId);
    const { assets, assetsMap, addAsset, getAsset } = useAssets(gameId);
    useSceneSync(gameId);

    const gameManagerContextObject: GameManagerContextObject = {
        addAsset,
        assets,
    }

    return (
        <GameManagerContext.Provider value={gameManagerContextObject}>
            {children}
        </GameManagerContext.Provider>
    )
}