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

            {/* <div style={{position: 'absolute', backgroundColor: 'White', top: 0, left: 0, width: '300px', height: '100px'}}>
                scale: {scale.current?.toFixed(2)} <br />
                offset: {`{x: ${panState.current?.x.toFixed(2)} , y: ${panState.current?.y.toFixed(2)}}`} <br />
                mousePos: {`{x: ${mousePosition.current?.x.toFixed(2)}, y: ${mousePosition.current?.y.toFixed(2)}}`} <br />
            </div> */}
        </>
    )
}