import React, {
    createContext,
    Dispatch,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

import { Vector2 } from '../../Utils/vector2';
import { useCanvasContext } from '../hooks/useCanvasContext';

interface WorldContextObject {
    canvas: MutableRefObject<HTMLCanvasElement>;
    canvasContext: MutableRefObject<CanvasRenderingContext2D>;
    mousePosition: MutableRefObject<Vector2>;
    scale: MutableRefObject<number>,
    offset: MutableRefObject<Vector2>;
    backgroundColor: MutableRefObject<string>;
    panState: Vector2;
    setPanState: Dispatch<SetStateAction<Vector2>>;
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

    const [panState, setPanState] = useState<Vector2>();
    const scale = useRef<number>(0);
    const offset = useRef<Vector2>(Vector2.zero);

    const worldContextObject: WorldContextObject = {
        canvas,
        canvasContext,
        mousePosition,
        scale,
        offset,
        backgroundColor,
        panState,
        setPanState,
    }

    return (
        <WorldContext.Provider value={worldContextObject}>
            {children}
        </WorldContext.Provider>
    )
}