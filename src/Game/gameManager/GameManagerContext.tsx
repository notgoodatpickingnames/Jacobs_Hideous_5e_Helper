import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useParams } from 'react-router';

import { Game } from '../../components/Games/models/game';
import { useEngine } from '../../Utils/engine/Engine';
import { SyncableObject } from '../gameObjectTypes/syncableObject';
import { Asset } from './assets/models/asset';
import { useAssets } from './assets/useAssets';
import { useGame } from './game/useGame';
import { useSceneSync } from './scene/useSceneSync';

export interface GameManagerContextObject {
    addAsset: (file: File) => Promise<void>;
    assets: Asset[];
    syncGameObject: (gameObject: SyncableObject) => void;
    gameId: string;
    sceneId: string;
    game: Game;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { game, isUserOwnerOfGame } = useGame(gameId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { assets, assetsMap, addAsset, getAsset } = useAssets(gameId);
    const { gameObjects, syncGameObject, sceneId } = useSceneSync(gameId, assets);
    const { engineContext } = useEngine();

    useEffect(() => {
        gameObjects.forEach((gameObject) => {
            engineContext.addGameObject(gameObject);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameObjects]);

    const gameManagerContextObject: GameManagerContextObject = {
        addAsset,
        assets,
        syncGameObject,
        gameId,
        sceneId,
        game,
    }

    return (
        <GameManagerContext.Provider value={gameManagerContextObject}>
            {children}
        </GameManagerContext.Provider>
    )
}