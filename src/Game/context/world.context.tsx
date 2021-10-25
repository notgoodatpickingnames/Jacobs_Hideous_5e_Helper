import React, { createContext, MutableRefObject, ReactNode, useContext, useRef } from 'react';

import { Vector2 } from '../../Utils/engine/Vector2';
import { useCanvasContext } from '../hooks/useCanvasContext';

interface WorldContextObject {
    canvas: MutableRefObject<HTMLCanvasElement>;
    canvasContext: MutableRefObject<CanvasRenderingContext2D>;
    mousePosition: MutableRefObject<Vector2>;
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
    const mousePosition= useRef<Vector2>(Vector2.zero);
    const backgroundColor = useRef<string>();

    const canvas = useRef<HTMLCanvasElement>();
    const canvasContext = useCanvasContext(canvas);

    const panState = useRef<Vector2>(Vector2.zero);
    const scale = useRef<number>(1);

    const worldContextObject: WorldContextObject = {
        canvas,
        canvasContext,
        mousePosition,
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