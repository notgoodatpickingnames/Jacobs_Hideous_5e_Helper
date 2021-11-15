import React, { createContext, KeyboardEvent, MutableRefObject, ReactNode, useContext, useRef } from 'react';

import useEventListener from '../../hooks/useEventListener';

export interface InputContextObject {
}

export const InputContext = createContext<InputContextObject>({} as InputContextObject);

export function useInputContext(): InputContextObject {
    return useContext(InputContext);
}

interface InputContextProviderProps {
    children: ReactNode | ReactNode[];
}

export function InputContextProvider({children}: InputContextProviderProps) {

    function onKeyUp(event: KeyboardEvent): void {
        console.log('EVENT', event, event.key);
    }

    function onKeyDown(event: KeyboardEvent): void {
        console.log('EVENT', event, event.key);
    }

    useEventListener('keydown', (event: any) => onKeyDown(event as KeyboardEvent));
    useEventListener('keyup', (event: any) => onKeyUp(event as KeyboardEvent));

    const inputContextObject: InputContextObject = {
    }

    return (
        <InputContext.Provider value={inputContextObject}>
            {children}
        </InputContext.Provider>
    )
}