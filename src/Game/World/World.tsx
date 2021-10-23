import { makeStyles } from '@mui/styles';
import React, { MutableRefObject, useEffect } from 'react';

import Canvas from '../../Canvas';
import { useWorldContext } from '../context/world.context';
import { useCanvasDraw } from '../hooks/useCanvasDraw';
import { useMousePositionInWorld } from '../hooks/useMousePositionInWorld';
import usePan from '../hooks/usePan';
import useScale from '../hooks/useScale';

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
        width: '2000px', // Replace with custom map sizes after map creation is finished.
        height: '2000px', // Replace with custom map sizes after map creation is finished.
        maxHeight: '2000px',
        minHeight: '2000px',
    }
}));

export function World() {
    const classes = useStyles();

    

    const {scale, offset, backgroundColor, canvas, canvasContext, setPanState, mousePosition} = useWorldContext();

    const startPan = usePan(setPanState);
    useScale(canvas);
    useMousePositionInWorld(mousePosition, offset, scale, canvas);
    
    useCanvasDraw(mousePosition, canvas, canvasContext);

    function onCanvasRedraw(): void {
        if (Boolean(canvas.current) && Boolean(canvasContext.current)) {
            const _canvas = canvas.current;
            const context = canvasContext.current;

            // Clear Screen;
            context.clearRect(0, 0, _canvas.width, _canvas.height);
    
            // Render Background;
            context.fillStyle = backgroundColor.current;
            context.fillRect(0, 0, _canvas.width, _canvas.height);
        }
    }

    function setCanvasRef(_canvas: MutableRefObject<HTMLCanvasElement>): void {
        canvas.current = _canvas.current;
    }

    useEffect(() => {
        if (Boolean(canvas.current) && Boolean(canvasContext.current)) {
            canvasContext.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

            let panX = offset.current.x * -1;
            let panY = offset.current.y * -1;

            canvasContext.current.translate(panX, panY);
            canvasContext.current.scale(scale.current, scale.current);

            onCanvasRedraw();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, scale, canvasContext, canvas]);

    return (
        <div className={classes.worldContainer}>
            <div className={classes.mapContainer}>
                <Canvas onCanvasRedraw={onCanvasRedraw} onCanvasRefCreated={setCanvasRef} onMouseDown={startPan}/>
            </div>
        </div>
    )
}