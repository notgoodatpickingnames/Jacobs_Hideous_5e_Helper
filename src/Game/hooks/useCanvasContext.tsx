import { MutableRefObject, useEffect, useRef } from 'react';

export function useCanvasContext(canvas: MutableRefObject<HTMLCanvasElement>) {
    const canvasContext = useRef<CanvasRenderingContext2D>();

    useEffect(() => {
        if (Boolean(canvas)) {
            canvasContext.current = canvas.current.getContext('2d');
        }
    }, [canvas]);

    return canvasContext;
}