import { useEffect, useLayoutEffect } from 'react';

import { useWorldContext } from './context/world.context';
import ControlBar from './ControlBar';
import BuildControls from './ControlBar/BuildControls';
import { World } from './World';

export function Game() {
    const {backgroundColor} = useWorldContext();

    useLayoutEffect(() => {
        backgroundColor.current = 'grey';
    }, [backgroundColor]);

    return (
        <>
            <World />

            <ControlBar>
                <BuildControls />
            </ControlBar>
        </>
    )
}