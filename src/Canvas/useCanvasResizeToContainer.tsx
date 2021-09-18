import { MutableRefObject, useEffect } from 'react';

import useElementSize from '../Utils/hooks/useElementSize';

export function useCanvasResizeToContainer(canvasRef: MutableRefObject<HTMLCanvasElement>, containerRef: MutableRefObject<HTMLDivElement>, onCanvasResize: () => void) {
    const canvasContainerSize = useElementSize(containerRef);

    useEffect(() => {
        if (canvasRef && canvasContainerSize) {
            const canvas = canvasRef.current;

            canvas.height = canvasContainerSize.height;
            canvas.width = canvasContainerSize.width;

            onCanvasResize();
        }

    }, [canvasRef, canvasContainerSize, onCanvasResize]);
}