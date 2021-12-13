import { ReactNode } from 'react';

import {
    ContextMenuContextObject,
    ContextMenuContextProvider,
    useContextMenuContext,
} from './contextMenu/contextMenu.context';
import { EngineContextObject, EngineContextProvider, useEngineContext } from './engine/engine.context';
import { InputContextObject, InputContextProvider, useInputContext } from './input/input.context';
import { useWorldContext, WorldContextObject, WorldContextProvider } from './world/world.context';

interface EngineProviderProps {
    children: ReactNode | ReactNode[];
}

export function EngineProvider({children}: EngineProviderProps) {
    return (
        <WorldContextProvider>
            <ContextMenuContextProvider>
                <InputContextProvider>
                    <EngineContextProvider>
                        {children}
                    </EngineContextProvider>
                </InputContextProvider>
            </ContextMenuContextProvider>
        </WorldContextProvider>
    )
}

export interface Engine {
    engineContext: EngineContextObject;
    inputContext: InputContextObject;
    worldContext: WorldContextObject;
    contextMenuContext: ContextMenuContextObject;
}

export function useEngine() {
    const engineContext = useEngineContext();
    const inputContext = useInputContext();
    const worldContext = useWorldContext();
    const contextMenuContext = useContextMenuContext();

    return {
        engineContext,
        inputContext,
        worldContext,
        contextMenuContext,
    }
}