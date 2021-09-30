import { useWorldContext } from './context/world.context';
import ControlBar from './ControlBar';
import BuildControls from './ControlBar/BuildControls';
import { World } from './World';

export function Game() {

    const {mousePosition, scale, offset} = useWorldContext();

    return (
        <>
            <World />

            <ControlBar>
                <BuildControls />
            </ControlBar>

            <div style={{position: 'absolute', backgroundColor: 'White', top: 0, left: 0, width: '300px', height: '100px'}}>
                scale: {scale.toFixed(2)} <br />
                offset: {`{x: ${offset.x.toFixed(2)} , y: ${offset.y.toFixed(2)}}`} <br />
                mousePos: {`{x: ${mousePosition.current.x.toFixed(2)}, y: ${mousePosition.current.y.toFixed(2)}}`} <br />
            </div>
        </>
    )
}