import React, { createContext, MutableRefObject, ReactNode, useContext, useRef, useState } from 'react';

import { GameObject } from '.';

export interface ContextMenuContextObject {
    gameObject: GameObject;
    isOpen: boolean;
    openContextMenu: (gameObject: GameObject) => void;
    closeContextMenu: () => void;
}

export const ContextMenuContext = createContext<ContextMenuContextObject>({} as ContextMenuContextObject);

export function useContextMenuContext(): ContextMenuContextObject {
    return useContext(ContextMenuContext);
}

interface ContextMenuContextProviderProps {
    children: ReactNode | ReactNode[];
}

export function ContextMenuContextProvider({children}: ContextMenuContextProviderProps) {
    const [gameObject, setGameObject] = useState<GameObject>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function openContextMenu(gameObject: GameObject): void {
        console.log('Called open');
        setGameObject(gameObject);
        setIsOpen(true);
    }

    function closeContextMenu(): void {
        console.log('Called closed');
        setIsOpen(false);
        setGameObject(undefined);
    }

    const contextMenuContextObject: ContextMenuContextObject = {
        gameObject,
        isOpen,
        openContextMenu,
        closeContextMenu,
    }

    return (
        <ContextMenuContext.Provider value={contextMenuContextObject}>
            {children}
        </ContextMenuContext.Provider>
    )
}