import React, { createContext, MutableRefObject, ReactNode, useContext, useRef } from 'react';

import { useEngine } from './Engine';
import { GameObject } from './GameObject';
import { useClickableGameObjects } from './useClickableGameObjects';
import { useGameObjects } from './useGameObjects';
import { useMainLoop } from './useMainLoop';
import { useWorldContext } from './world.context';

export interface EngineContextObject {
    gameObjects: MutableRefObject<Map<string, GameObject>>;
    gameObjectsByLayer: MutableRefObject<Map<number, Map<string, GameObject>>>;
    addGameObject: (gameObject: GameObject) => void;
    getGameObject: (gameObjectId: string) => GameObject;
    removeGameObject: (gameObject: GameObject) => void;
    addFunctionOnRender: (functionOnRender: () => void) => void;
}

export const EngineContext = createContext<EngineContextObject>({} as EngineContextObject);

export function useEngineContext(): EngineContextObject {
    return useContext(EngineContext);
}

interface EngineContextProviderProps {
    children: ReactNode | ReactNode[];
}

export function EngineContextProvider({children}: EngineContextProviderProps) {
    const [gameObjects, gameObjectsByLayer, addGameObject, getGameObject, removeGameObject] = useGameObjects();
    const functionsOnRender = useRef<(() => void)[]>([]);
    const {canvas, canvasContext} = useWorldContext();

    useMainLoop(onFrame);

    function addFunctionOnRender(functionOnRender: () => void): void {
        functionsOnRender.current.push(functionOnRender);
    }

    const engineContextObject: EngineContextObject = {
        gameObjects,
        gameObjectsByLayer,
        addGameObject,
        getGameObject,
        removeGameObject,
        addFunctionOnRender,
    }

    const engine = useEngine();
    engine.engineContext = engineContextObject;

    function onFrame(time: number, deltaTime: number): void {
        clearScreen();
        callFunctionsOnRender();
        updateAndRenderGameObjects();
    }

    function clearScreen(): void {
        canvasContext.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    }

    function callFunctionsOnRender(): void {
        functionsOnRender.current.forEach((functionOnRender) => functionOnRender());
    }

    function updateAndRenderGameObjects(): void {
        gameObjectsByLayer.current.forEach((layer) => {
            layer.forEach((gameObject) => {
                gameObject.update();
                gameObject.render(engine);
            });
        });
    }

    useClickableGameObjects(gameObjectsByLayer, engine);

    return (
        <EngineContext.Provider value={engineContextObject}>
            {children}
        </EngineContext.Provider>
    )
}