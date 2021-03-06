import { MutableRefObject, useEffect, useRef } from 'react';

import { useElementSize } from '../../Utils/hooks/size';
import { Size } from '../../Utils/hooks/size/size';

export function useCanvasResizeToContainer(canvasRef: MutableRefObject<HTMLCanvasElement>, containerRef: MutableRefObject<HTMLDivElement>, onCanvasResize: () => void) {
    const canvasContainerSize = useElementSize(containerRef);

    const lastCanvasContainerSize = useRef<Size>();

    useEffect(() => {
        if (canvasRef && canvasContainerSize && (canvasContainerSize.height !== lastCanvasContainerSize.current?.height || canvasContainerSize.width !== lastCanvasContainerSize.current?.width)) {
            lastCanvasContainerSize.current = canvasContainerSize;
            const canvas = canvasRef.current;

            canvas.height = canvasContainerSize.height;
            canvas.width = canvasContainerSize.width;

            onCanvasResize();
        }

    }, [canvasRef, canvasContainerSize, onCanvasResize]);
}