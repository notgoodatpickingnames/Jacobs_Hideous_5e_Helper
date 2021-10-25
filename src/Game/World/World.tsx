import { makeStyles } from '@mui/styles';
import React, { MutableRefObject, useEffect, useReducer, useRef } from 'react';

import Canvas from '../../Canvas';
import { useEngineContext, WorldPosition } from '../../Utils/engine';
import { Vector2 } from '../../Utils/engine/Vector2';
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

    const panStateOnLastRender = useRef<Vector2>(Vector2.zero);
    const scaleOnLastRender = useRef<number>(1);

    const {scale, panState, backgroundColor, canvas, canvasContext, mousePosition} = useWorldContext();
    const {addFunctionOnRender} = useEngineContext();

    const startPan = usePan(panState);
    useScale(canvas, scale);
    useMousePositionInWorld(mousePosition, panState, scale, canvas);
    
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
        addFunctionOnRender(onRender);
    }, [addFunctionOnRender]);

    function onRender(): void {
        if (Boolean(canvas.current) && Boolean(canvasContext.current)) {
            canvasContext.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

            if (scaleOnLastRender.current !== scale.current || !panStateOnLastRender.current.equals(panState.current)) {
                canvasContext.current.setTransform(scale.current, 0, 0, scale.current, 0, 0);

                scaleOnLastRender.current = scale.current;
            }

            if (!panStateOnLastRender.current.equals(panState.current)) {
                const difference = panStateOnLastRender.current.subtract(panState.current);
                let panX = difference.x / scale.current;
                let panY = difference.y  / scale.current;

                const newWorldPos = WorldPosition.add(new Vector2(panX, panY));
                WorldPosition.set(newWorldPos.x, newWorldPos.y);

                panStateOnLastRender.current = panState.current;
            }

            onCanvasRedraw();
        }
    }

    return (
        <div className={classes.worldContainer}>
            <div className={classes.mapContainer}>
                <Canvas onCanvasRedraw={onCanvasRedraw} onCanvasRefCreated={setCanvasRef} onMouseDown={startPan}/>
            </div>
        </div>
    )
}