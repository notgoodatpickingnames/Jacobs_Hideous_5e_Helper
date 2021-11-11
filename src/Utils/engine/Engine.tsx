import { ReactNode } from 'react';

import { ContextMenuContextObject, ContextMenuContextProvider, useContextMenuContext } from './contextMenu.context';
import { EngineContextObject, EngineContextProvider, useEngineContext } from './engine.context';
import { useWorldContext, WorldContextObject, WorldContextProvider } from './world.context';

interface EngineProviderProps {
    children: ReactNode | ReactNode[];
}

export function EngineProvider({children}: EngineProviderProps) {
    return (
        <WorldContextProvider>
            <ContextMenuContextProvider>
                <EngineContextProvider>
                    {children}
                </EngineContextProvider>
            </ContextMenuContextProvider>
        </WorldContextProvider>
    )
}

export interface Engine {
    engineContext: EngineContextObject;
    worldContext: WorldContextObject;
    contextMenuContext: ContextMenuContextObject;
}

export function useEngine() {
    const engineContext = useEngineContext();
    const worldContext = useWorldContext();
    const contextMenuContext = useContextMenuContext();

    return {
        engineContext,
        worldContext,
        contextMenuContext,
    }
}