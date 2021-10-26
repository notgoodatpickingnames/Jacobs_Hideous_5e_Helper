import { useEffect, useLayoutEffect } from 'react';

import { useEngineContext } from '../Utils/engine';
import { Vector2 } from '../Utils/engine/Vector2';
import { useWorldContext } from './context/world.context';
import ControlBar from './ControlBar';
import BuildControls from './ControlBar/BuildControls';
import { Token } from './models/Token';
import { World } from './World';

export function Game() {
    const {addGameObject} = useEngineContext();
    const {backgroundColor} = useWorldContext();

    useLayoutEffect(() => {
        backgroundColor.current = 'grey';
    }, [backgroundColor]);

    useEffect(() => {
        for (let x = 0; x < 200; x++) {
            for (let y = 0; y < 200; y++) {
                const Juniper = new Token(new Vector2(x * 100, y * 100), 100, 100, './images/Juni.png');
                addGameObject(Juniper);
            }
        }
    }, [addGameObject]);

    return (
        <>
            <World />

            <ControlBar>
                <BuildControls />
            </ControlBar>

            <div style={{position: 'absolute', backgroundColor: 'White', top: 0, left: 0, width: '300px', height: '100px'}}>
                <img height='100' width='100' src={'./images/Juni.png'}/>
            </div>
        </>
    )
}