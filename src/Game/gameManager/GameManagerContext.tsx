import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useParams } from 'react-router';

import { GameObject } from '../../Utils/engine';
import { useEngine } from '../../Utils/engine/Engine';
import { ImageObject } from '../gameObjectTypes/ImageObject';
import { NPCObject } from '../gameObjectTypes/npcObject';
import { Asset } from './assets/models/asset';
import { useAssets } from './assets/useAssets';
import { useGame } from './game/useGame';
import { useSceneSync } from './scene/useSceneSync';

export interface GameManagerContextObject {
    addAsset: (file: File) => Promise<void>;
    assets: Asset[];
    createGameObject: (gameObject: ImageObject | GameObject | NPCObject) => void;
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
    const {gameObjects, createGameObject} = useSceneSync(gameId, assets);
    const {engineContext} = useEngine();

    useEffect(() => {
        console.log('Server Changed So updating all Game Objects', gameObjects);
        gameObjects.forEach((gameObject) => {
            engineContext.addGameObject(gameObject);
        });

    }, [gameObjects]);

    const gameManagerContextObject: GameManagerContextObject = {
        addAsset,
        assets,
        createGameObject,
    }

    return (
        <GameManagerContext.Provider value={gameManagerContextObject}>
            {children}
        </GameManagerContext.Provider>
    )
}