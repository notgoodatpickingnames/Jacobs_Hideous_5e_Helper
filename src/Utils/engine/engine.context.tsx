import React, { createContext, MutableRefObject, ReactNode, useContext, useRef } from 'react';

import { useWorldContext } from '../../Game/context/world.context';
import { GameObject } from './gameObject';
import { useGameObjects } from './useGameObjects';
import { useMainLoop } from './useMainLoop';


interface EngineContextObject {
    gameObjects: MutableRefObject<Map<string, GameObject>>;
    gameObjectsByLayer: MutableRefObject<Map<number, Map<string, GameObject>>>;
    addGameObject: (gameObject: GameObject) => void;
    getGameObject: (gameObjectId: string) => GameObject;
    removeGameObject: (gameObject: GameObject) => void;
}

export const EngineContext = createContext<EngineContextObject>({} as EngineContextObject);

export function useEngineContext(): EngineContextObject {
    return useContext(EngineContext);
}

interface EngineContextProviderProps {
    children: ReactNode[];
}

export function EngineContextProvider({children}: EngineContextProviderProps) {
    const [gameObjects, gameObjectsByLayer, addGameObject, getGameObject, removeGameObject] = useGameObjects();
    const {canvasContext} = useWorldContext();
    useMainLoop(onFrame);

    function onFrame(time: number, deltaTime: number): void {
        renderGameObjects();
    }

    function renderGameObjects(): void {
        gameObjectsByLayer.current.forEach((layer) => {
            layer.forEach((gameObject) => {
                gameObject.render(canvasContext.current);
            });
        });
    }

    const engineContextObject: EngineContextObject = {
        gameObjects,
        gameObjectsByLayer,
        addGameObject,
        getGameObject,
        removeGameObject,
    }

    return (
        <EngineContext.Provider value={engineContextObject}>
            {children}
        </EngineContext.Provider>
    )
}