import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';
import React, { MutableRefObject, useEffect, useState } from 'react';

import Canvas from '../Canvas';
import usePan from '../Canvas/usePan';
import { useGrid } from '../Grid/useGrid';
import useEventListener from '../Utils/hooks/useEventListener';

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

    const [grid] = useGrid(canvasRef?.current, 5, 5, 2); // Replace with custom map sizes after map creation is finished.

    function onCanvasRedraw(): void {
        if (Boolean(canvasRef)) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
    
            context.fillStyle = 'grey'
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    
            grid?.render();
        }
    }

    useEventListener('keypress', (event: any) => {
        console.log('YEEET', event);
        if (Boolean(canvasRef)) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    const [offset, startPan] = usePan();

    useEffect(() => {
        if (Boolean(canvasRef)) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.translate(offset.x * -1, offset.y * -1);

            onCanvasRedraw();
        }
    }, [offset, canvasRef]);

    return (
        <>
            <div className={classes.worldContainer}>
                <div className={classes.mapContainer}>
                    <Canvas onCanvasRedraw={onCanvasRedraw} onCanvasRefCreated={setCanvasRef} onMouseDown={startPan}/>
                </div>
            </div>

            <div style={{height: '100px', display: 'flex', alignItems: 'flex-end', position: 'fixed', top: '100px', left: '100px'}}>
                <span>{JSON.stringify(offset)}</span>
            </div>
        </>
    )
}