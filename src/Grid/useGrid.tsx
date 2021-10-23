import { useEffect, useRef } from 'react';

import { Grid } from './Grid';

export function useGrid(width: number, height: number, squareSize: number) {
    const grid = useRef<Grid>();

    useEffect(() => {
        if (width !== undefined && height !== undefined && squareSize !== undefined) {
            const _grid = new Grid(width, height, squareSize);

            grid.current = _grid;
        }
    }, [width, height, squareSize]);

    return [grid] as const;
}