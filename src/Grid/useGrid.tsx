import { useEffect, useState } from 'react';

import { Grid } from './Grid';

export function useGrid(canvasRef: HTMLCanvasElement, width: number, height: number, squareSize: number) {
    const [grid, setGrid] = useState<Grid>();

    useEffect(() => {
        if (Boolean(canvasRef) && width !== undefined && height !== undefined && squareSize !== undefined) {
            const grid = new Grid(canvasRef, width, height, squareSize);

            setGrid(grid);
        }
    }, [canvasRef, width, height, squareSize]);

    return [grid] as const;
}