import { useEffect, useRef } from 'react';

import { Grid } from './Grid';

export function useGrid(canvasRef: HTMLCanvasElement, width: number, height: number, squareSize: number) {
    const grid = useRef<Grid>();

    useEffect(() => {
        if (Boolean(canvasRef) && width !== undefined && height !== undefined && squareSize !== undefined) {
            const _grid = new Grid(canvasRef, width, height, squareSize);

            grid.current = _grid;
        }
    }, [canvasRef, width, height, squareSize]);

    return [grid] as const;
}