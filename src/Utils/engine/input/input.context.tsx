import React, { createContext, MutableRefObject, ReactNode, useContext, useRef } from 'react';

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

    const inputContextObject: InputContextObject = {
    }

    return (
        <InputContext.Provider value={inputContextObject}>
            {children}
        </InputContext.Provider>
    )
}