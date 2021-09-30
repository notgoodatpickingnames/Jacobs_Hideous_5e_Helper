import React, { createContext, MutableRefObject, ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { Vector2 } from '../../Utils/vector2';

interface WorldContextObject {
    mousePosition: MutableRefObject<Vector2>;
    scale: number,
    setScale: (scale: number) => void;
    offset: Vector2;
    setOffset: (offset: Vector2) => void;
}

export const WorldContext = createContext<WorldContextObject>({} as WorldContextObject);

export function useWorldContext(): WorldContextObject {
    return useContext(WorldContext);
}

interface useWithSideEffectsProps {
    mousePosition: Vector2,
    scale: number,
    offset: Vector2
}

export function useWorldContextWithSideEffects({mousePosition, scale, offset}: useWithSideEffectsProps): WorldContextObject {
    const context = useContext(WorldContext);

    useEffect(() => {
        context.mousePosition.current = mousePosition;
        context.setScale(scale);
        context.setOffset(offset);
    }, [mousePosition, scale, offset]);

    return context;
}

interface WorldContextProviderProps {
    children: ReactNode[];
}

export function WorldContextProvider({children}: WorldContextProviderProps) {
    const mousePosition= useRef<Vector2>(Vector2.zero);
    const [scale, setScale] = useState<number>(1);
    const [offset, setOffset] = useState<Vector2>(Vector2.zero);

    const worldContextObject: WorldContextObject = {
        mousePosition,
        scale,
        setScale,
        offset,
        setOffset
    }

    return (
        <WorldContext.Provider value={worldContextObject}>
            {children}
        </WorldContext.Provider>
    )
}