import React, { createContext, MutableRefObject, ReactNode, useContext, useRef } from 'react';

import { Vector2 } from '../../Utils/engine/Vector2';
import { useCanvasContext } from '../hooks/useCanvasContext';
import { useMousePositionInWorld } from '../hooks/useMousePositionInWorld';

interface WorldContextObject {
    canvas: MutableRefObject<HTMLCanvasElement>;
    canvasContext: MutableRefObject<CanvasRenderingContext2D>;
    mousePositionInWorld: MutableRefObject<Vector2>;
    gridPositionMouseIsOver: MutableRefObject<Vector2>;
    getPositionInScreenSpace: (position: Vector2) => Vector2;
    scale: MutableRefObject<number>,
    backgroundColor: MutableRefObject<string>;
    panState: MutableRefObject<Vector2>;
}

export const WorldContext = createContext<WorldContextObject>({} as WorldContextObject);

export function useWorldContext(): WorldContextObject {
    return useContext(WorldContext);
}

interface WorldContextProviderProps {
    children: ReactNode[];
}

export function WorldContextProvider({children}: WorldContextProviderProps) {
    const backgroundColor = useRef<string>();

    const canvas = useRef<HTMLCanvasElement>();
    const canvasContext = useCanvasContext(canvas);

    const panState = useRef<Vector2>(Vector2.zero);
    const scale = useRef<number>(1);

    const {mousePositionInWorld, gridPositionMouseIsOver, getPositionInScreenSpace} = useMousePositionInWorld(scale, canvas);

    const worldContextObject: WorldContextObject = {
        canvas,
        canvasContext,
        mousePositionInWorld,
        gridPositionMouseIsOver,
        getPositionInScreenSpace,
        scale,
        panState,
        backgroundColor,
    }

    return (
        <WorldContext.Provider value={worldContextObject}>
            {children}
        </WorldContext.Provider>
    )
}