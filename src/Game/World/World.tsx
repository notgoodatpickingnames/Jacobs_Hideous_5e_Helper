import { makeStyles } from '@mui/styles';
import React, { MutableRefObject, useEffect, useRef } from 'react';

import { useEngineContext, WorldPosition } from '../../Utils/engine';
import { useInputContext } from '../../Utils/engine/input/input.context';
import { Vector2 } from '../../Utils/engine/models/Vector2';
import { useWorldContext } from '../../Utils/engine/world/world.context';
import { useElementSize } from '../../Utils/hooks/size';
import Canvas from '../Canvas';
import { Grid } from '../Grid';
import { useCanvasDraw } from '../hooks/useCanvasDraw';
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
        position: 'fixed',
        width: '100vw', // Replace with custom map sizes after map creation is finished.
        height: '100vh', // Replace with custom map sizes after map creation is finished.
    }
}));

export const gridSquareSize = 40;

export function World() {
    const classes = useStyles();

    const panStateOnLastRender = useRef<Vector2>(Vector2.zero);
    const scaleOnLastRender = useRef<number>(1);

    const {scale, panState, backgroundColor, canvas, canvasContext} = useWorldContext();
    const {mousePositionInWorld} = useInputContext();
    const {addFunctionOnRender, setGameObject} = useEngineContext();

    const mapContainer = useRef<HTMLDivElement>();
    const mapContainerSize = useElementSize(mapContainer);

    const startPan = usePan(panState);
    useScale(canvas, scale);
    
    useCanvasDraw(mousePositionInWorld, canvas, canvasContext);

    useEffect(() => {
        if (mapContainerSize.width !== 0 && mapContainerSize.height !== 0) {
            const grid = new Grid(mapContainerSize.width, mapContainerSize.height, gridSquareSize);
            setGameObject(grid);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapContainerSize]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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