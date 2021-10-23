import { useEffect, useLayoutEffect } from 'react';

import { useGrid } from '../Grid/useGrid';
import { useEngineContext } from '../Utils/engine';
import { useWorldContext } from './context/world.context';
import ControlBar from './ControlBar';
import BuildControls from './ControlBar/BuildControls';
import { World } from './World';

export function Game() {

    const {mousePosition, scale, offset, backgroundColor} = useWorldContext();
    const {addGameObject} = useEngineContext();

    useLayoutEffect(() => {
        backgroundColor.current = 'grey';
    }, [backgroundColor]);

    const [grid] = useGrid(2000, 2000, 10); // Replace with custom map sizes after map creation is finished.

    useEffect(() => {
        addGameObject(grid.current);
    }, [addGameObject, grid]);

    return (
        <>
            <World />

            <ControlBar>
                <BuildControls />
            </ControlBar>

            <div style={{position: 'absolute', backgroundColor: 'White', top: 0, left: 0, width: '300px', height: '100px'}}>
                scale: {scale.current?.toFixed(2)} <br />
                offset: {`{x: ${offset.current?.x.toFixed(2)} , y: ${offset.current?.y.toFixed(2)}}`} <br />
                mousePos: {`{x: ${mousePosition.current?.x.toFixed(2)}, y: ${mousePosition.current?.y.toFixed(2)}}`} <br />
            </div>
        </>
    )
}