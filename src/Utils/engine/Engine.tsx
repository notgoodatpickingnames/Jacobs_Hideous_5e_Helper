import { ReactNode } from 'react';

import {
    AssetManagerContextObject,
    AssetManagerContextProvider,
    useAssetManagerContext,
} from './assetManager/assetManager.context';
import {
    ContextMenuContextObject,
    ContextMenuContextProvider,
    useContextMenuContext,
} from './contextMenu/contextMenu.context';
import { EngineContextObject, EngineContextProvider, useEngineContext } from './engine/engine.context';
import { GameContextObject, GameContextProvider, useGameContext } from './GameContext/game.context';
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
                        <GameContextProvider>
                            <AssetManagerContextProvider>
                                {children}
                            </AssetManagerContextProvider>
                        </GameContextProvider>
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
    gameContext: GameContextObject;
    assetManagerContext: AssetManagerContextObject;
}

export function useEngine() {
    const engineContext = useEngineContext();
    const inputContext = useInputContext();
    const worldContext = useWorldContext();
    const contextMenuContext = useContextMenuContext();
    const assetManagerContext = useAssetManagerContext();
    const gameContext = useGameContext();

    return {
        engineContext,
        inputContext,
        worldContext,
        contextMenuContext,
        assetManagerContext,
        gameContext,
    }
}