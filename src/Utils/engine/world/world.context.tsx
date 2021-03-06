import React, { createContext, MutableRefObject, ReactNode, useContext, useRef } from 'react';

import { useCanvasContext } from '../../../Game/hooks/useCanvasContext';
import { Vector2 } from '../models/Vector2';

export interface WorldContextObject {
    canvas: MutableRefObject<HTMLCanvasElement>;
    canvasContext: MutableRefObject<CanvasRenderingContext2D>;
    scale: MutableRefObject<number>,
    backgroundColor: MutableRefObject<string>;
    panState: MutableRefObject<Vector2>;
}

export const WorldContext = createContext<WorldContextObject>({} as WorldContextObject);

export function useWorldContext(): WorldContextObject {
    return useContext(WorldContext);
}

interface WorldContextProviderProps {
    children: ReactNode | ReactNode[];
}

export function WorldContextProvider({children}: WorldContextProviderProps) {
    const backgroundColor = useRef<string>();

    const canvas = useRef<HTMLCanvasElement>();
    const canvasContext = useCanvasContext(canvas);

    const panState = useRef<Vector2>(Vector2.zero);
    const scale = useRef<number>(1);

    const worldContextObject: WorldContextObject = {
        canvas,
        canvasContext,
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