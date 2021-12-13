import { useLayoutEffect } from 'react';

import { useWorldContext } from '../Utils/engine/world/world.context';
import { ContextMenu } from './ContextMenu';
import ControlBar from './ControlBar';
import BuildControls from './ControlBar/BuildControls';
import { GameManagerContextProvider } from './gameManager/GameManagerContext';
import { World } from './World';

export function Game() {
    const {backgroundColor} = useWorldContext();

    useLayoutEffect(() => {
        backgroundColor.current = 'grey';
    }, [backgroundColor]);

    return (
        <GameManagerContextProvider>
            <World />

            <ControlBar>
                <BuildControls />
            </ControlBar>

            <ContextMenu />
        </GameManagerContextProvider>
    )
}