import { makeStyles } from '@mui/styles';
import React, { MouseEvent as SyntheticMouseEvent, MutableRefObject, useEffect, useRef } from 'react';

import { useCanvasResizeToContainer } from './useCanvasResizeToContainer';


const useStyles = makeStyles({
    canvasContainer: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
});

interface CanvasProps {
    onCanvasRedraw: () => void;
    onCanvasRefCreated: (canvasRef: MutableRefObject<HTMLCanvasElement>) => void;
    onMouseDown: (event: SyntheticMouseEvent) => void;
}

function Canvas({onCanvasRedraw, onCanvasRefCreated, onMouseDown}: CanvasProps) {
    const classes = useStyles();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (Boolean(canvasRef)) {
            onCanvasRefCreated(canvasRef);
        }
    }, [canvasRef, onCanvasRefCreated]);
    
    useCanvasResizeToContainer(canvasRef, containerRef, onCanvasRedraw);

    return (
        <div ref={containerRef} className={classes.canvasContainer}>
            <canvas ref={canvasRef} onMouseDown={onMouseDown}/>
        </div>
    )
}

export default Canvas;