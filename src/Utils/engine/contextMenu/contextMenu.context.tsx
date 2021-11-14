import React, { createContext, ReactNode, useContext, useState } from 'react';

import { GameObject } from '..';
import { Engine } from '../Engine';

export interface MenuItem {
    label: string,
    onClick: (engine: Engine) => void;
}

export interface ContextMenuContextObject {
    gameObject: GameObject;
    isOpen: boolean;
    menuItems: MenuItem[];
    openContextMenu: (gameObject: GameObject, menuItems: MenuItem[]) => void;
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
    const [menuItems, setMenuContents] = useState<MenuItem[]>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function openContextMenu(gameObject: GameObject, menuContents: MenuItem[]): void {
        console.log('Called open');
        setGameObject(gameObject);
        setMenuContents(menuContents);
        setIsOpen(true);
    }

    function closeContextMenu(): void {
        console.log('Called closed');
        setIsOpen(false);
        setMenuContents(undefined);
        setGameObject(undefined);
    }

    const contextMenuContextObject: ContextMenuContextObject = {
        gameObject,
        isOpen,
        menuItems,
        openContextMenu,
        closeContextMenu,
    }

    return (
        <ContextMenuContext.Provider value={contextMenuContextObject}>
            {children}
        </ContextMenuContext.Provider>
    )
}