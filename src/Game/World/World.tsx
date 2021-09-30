import { makeStyles } from '@mui/styles';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

import Canvas from '../../Canvas';
import { useGrid } from '../../Grid/useGrid';
import { useLast } from '../../Utils/hooks/useLast';
import { useWorldContextWithSideEffects } from '../context/world.context';
import { useCanvasContext } from '../hooks/useCanvasContext';
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
    const [canvasRef, setCanvasRef] = useState<MutableRefObject<HTMLCanvasElement>>();
    const canvasContext = useCanvasContext(canvasRef);

    const [grid] = useGrid(canvasRef?.current, 20, 20, 10); // Replace with custom map sizes after map creation is finished.
    
    const [_offset, startPan] = usePan();
    const _scale = useScale(canvasRef);
    const lastScale = useLast(_scale);
    const mousePos = useMousePositionInWorld(_offset, _scale, canvasRef);
    useCanvasDraw(mousePos, canvasRef, canvasContext);

    const {scale, offset} = useWorldContextWithSideEffects({mousePosition: mousePos.current, scale: _scale, offset: _offset});

    function onCanvasRedraw(): void {
        if (Boolean(canvasRef) && Boolean(canvasContext) && Boolean(canvasContext.current)) {
            const canvas = canvasRef.current;
            const context = canvasContext.current;
            context.clearRect(0, 0, canvas.width, canvas.height);
    
            context.fillStyle = 'grey'
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);

            context.fillStyle = 'black';
            context.fillRect(0, 0, 50, 50);
            context.fillRect(950, 950, 50, 50);
    
            grid?.current?.render();
        }
    }

    useEffect(() => {
        if (Boolean(canvasRef) && Boolean(canvasContext)) {
            canvasContext.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            let panX = offset.x * -1;
            let panY = offset.y * -1;

            canvasContext.current.translate(panX, panY);
            canvasContext.current.scale(scale, scale);

            onCanvasRedraw();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, scale, canvasContext, canvasRef]);

    return (
        <div className={classes.worldContainer}>
            <div className={classes.mapContainer}>
                <Canvas onCanvasRedraw={onCanvasRedraw} onCanvasRefCreated={setCanvasRef} onMouseDown={startPan}/>
            </div>
        </div>
    )
}