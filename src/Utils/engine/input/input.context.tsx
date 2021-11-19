import React, { createContext, KeyboardEvent, MutableRefObject, ReactNode, useContext, useRef } from 'react';

import { useMousePositionInWorld } from '../../../Game/hooks/useMousePositionInWorld';
import { useEventListener } from '../../hooks/useEventListener';
import { Vector2 } from '../models/Vector2';
import { useWorldContext } from '../world/world.context';
import { Input } from './input';

export interface InputContextObject {
    inputs: MutableRefObject<Input>;
    onFrameStart: () => void;
    onFrameEnd: () => void;
    mousePositionInWorld: MutableRefObject<Vector2>;
    gridPositionMouseIsOver: MutableRefObject<Vector2>;
    getPositionInScreenSpace: (position: Vector2) => Vector2;
}

export const InputContext = createContext<InputContextObject>({} as InputContextObject);

export function useInputContext(): InputContextObject {
    return useContext(InputContext);
}

interface InputContextProviderProps {
    children: ReactNode | ReactNode[];
}

export function InputContextProvider({children}: InputContextProviderProps) {
    const inputs = useRef<Input>(new Input());

    function onKeyUp(event: KeyboardEvent): void {
        inputs.current.onKeyUp(event.key);
    }

    function onKeyDown(event: KeyboardEvent): void {
        inputs.current.onKeyDown(event.key);
    }

    useEventListener('keydown', (event: any) => onKeyDown(event as KeyboardEvent));
    useEventListener('keyup', (event: any) => onKeyUp(event as KeyboardEvent));

    const {scale} = useWorldContext();
    const {mousePositionInWorld, gridPositionMouseIsOver, getPositionInScreenSpace} = useMousePositionInWorld(scale);

    const inputContextObject: InputContextObject = {
        inputs,
        onFrameStart: () => inputs.current.onFrameStart(),
        onFrameEnd: () => inputs.current.onFrameEnd(),
        mousePositionInWorld,
        gridPositionMouseIsOver,
        getPositionInScreenSpace
    }

    return (
        <InputContext.Provider value={inputContextObject}>
            {children}
        </InputContext.Provider>
    )
}