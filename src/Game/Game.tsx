import { makeStyles } from '@mui/styles';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

import Canvas from '../Canvas';
import { useGrid } from '../Grid/useGrid';
import { useLast } from '../Utils/hooks/useLast';
import { difference } from '../Utils/points/difference';
import { scale as scaleDelta } from '../Utils/points/scale';
import { sum } from '../Utils/points/sum';
import { Vector2 } from '../Utils/vector2';
import ControlBar from './ControlBar';
import { useCanvasContext } from './hooks/useCanvasContext';
import { useCanvasDraw } from './hooks/useCanvasDraw';
import { useMousePositionInWorld } from './hooks/useMousePositionInWorld';
import usePan from './hooks/usePan';
import useScale from './hooks/useScale';
import BuildControls from './menuItems/BuildControls';

const useStyles = makeStyles(({
    worldContainer: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
    },

    mapContainer: {
        width: '4000px', // Replace with custom map sizes after map creation is finished.
        height: '4000px', // Replace with custom map sizes after map creation is finished.
        maxHeight: '4000px',
        minHeight: '4000px',
    }
}));

export function Game() {
    const classes = useStyles();
    const [canvasRef, setCanvasRef] = useState<MutableRefObject<HTMLCanvasElement>>();
    const canvasContext = useCanvasContext(canvasRef);

    const [grid] = useGrid(canvasRef?.current, 20, 20, 10); // Replace with custom map sizes after map creation is finished.
    
    const [offset, startPan] = usePan();
    const lastOffset = useLast(offset);
    const scale = useScale(canvasRef);
    const lastScale = useLast(scale);
    const mousePos = useMousePositionInWorld(offset, Vector2.zero, canvasRef);
    useCanvasDraw(mousePos, canvasRef, canvasContext);

    const delta = difference(offset, lastOffset);
    const adjustedOffset = useRef(sum(offset, delta));

    if (lastScale === scale) {
        // No change in scale—just apply the delta between the last and new offset
        // to the adjusted offset.
        console.log('Scale Has Not Changed');
        adjustedOffset.current = sum(adjustedOffset.current, scaleDelta(delta, scale));
      } else {
        // The scale has changed—adjust the offset to compensate for the change in
        // relative position of the pointer to the canvas.
        console.log('Scale has Changed');
        const lastMouse = scaleDelta(mousePos.current, lastScale);
        const newMouse = scaleDelta(mousePos.current, scale);
        const mouseOffset = difference(lastMouse, newMouse);
        adjustedOffset.current = sum(adjustedOffset.current, mouseOffset);
      }

    function onCanvasRedraw(): void {
        if (Boolean(canvasRef) && Boolean(canvasContext) && Boolean(canvasContext.current)) {
            const canvas = canvasRef.current;
            const context = canvasContext.current;
            context.clearRect(0, 0, canvas.width, canvas.height);
    
            context.fillStyle = 'grey'
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);

            context.fillStyle = 'black';
            context.fillRect(0, 0, 50, 50);
    
            grid?.current?.render();
        }
    }

    useEffect(() => {
        if (Boolean(canvasRef) && Boolean(canvasContext)) {
            canvasContext.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            const panX = adjustedOffset.current.x * -1;
            const panY = adjustedOffset.current.y * -1;

            canvasContext.current.translate(panX, panY);
            canvasContext.current.scale(scale, scale);


            onCanvasRedraw();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, scale, canvasContext, canvasRef]);

    const scaledMouse = scaleDelta(mousePos.current, scale);

    return (
        <>
            <div className={classes.worldContainer}>
                <div className={classes.mapContainer}>
                    <Canvas onCanvasRedraw={onCanvasRedraw} onCanvasRefCreated={setCanvasRef} onMouseDown={startPan}/>
                </div>
            </div>

            <ControlBar>
                <BuildControls />
            </ControlBar>

            
            <div style={{position: 'absolute', backgroundColor: 'White', top: 0, left: 0, width: '300px', height: '200px'}}>
                scale: {scale.toFixed(2)} <br />
                offset: {`{x: ${offset.x.toFixed(2)} , y: ${offset.y.toFixed(2)}}`} <br />
                adjusted offset: {`{x: ${adjustedOffset.current.x.toFixed(2)} , y: ${adjustedOffset.current.y.toFixed(2)}}`} <br />
                scaledMousePos: {`{x: ${scaledMouse.x.toFixed(2)}, y: ${scaledMouse.y.toFixed(2)}}`} <br />
                mousePos: {`{x: ${mousePos.current.x.toFixed(2)}, y: ${mousePos.current.y.toFixed(2)}}`} <br />
            </div>
        </>
    )
}