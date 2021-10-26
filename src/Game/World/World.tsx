import { makeStyles } from '@mui/styles';
import React, { MutableRefObject, useEffect, useReducer, useRef } from 'react';

import Canvas from '../../Canvas';
import { Grid } from '../../Grid';
import { useEngineContext, WorldPosition } from '../../Utils/engine';
import { Vector2 } from '../../Utils/engine/Vector2';
import useElementSize from '../../Utils/hooks/useElementSize';
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
        width: '100vw', // Replace with custom map sizes after map creation is finished.
        height: '100vh', // Replace with custom map sizes after map creation is finished.
    }
}));

export function World() {
    const classes = useStyles();

    const panStateOnLastRender = useRef<Vector2>(Vector2.zero);
    const scaleOnLastRender = useRef<number>(1);

    const {scale, panState, backgroundColor, canvas, canvasContext, mousePosition} = useWorldContext();
    const {addFunctionOnRender, addGameObject} = useEngineContext();

    const mapContainer = useRef<HTMLDivElement>();
    const {width, height} = useElementSize(mapContainer);

    const startPan = usePan(panState);
    useScale(canvas, scale);
    useMousePositionInWorld(mousePosition, panState, scale, canvas);
    
    useCanvasDraw(mousePosition, canvas, canvasContext);

    useEffect(() => {
        const grid = new Grid(width, height, 40);
        addGameObject(grid);
    }, [addGameObject, width, height]);

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
            <div ref={mapContainer} className={classes.mapContainer}>
                <Canvas onCanvasRedraw={onCanvasRedraw} onCanvasRefCreated={setCanvasRef} onMouseDown={startPan}/>
            </div>
        </div>
    )
}