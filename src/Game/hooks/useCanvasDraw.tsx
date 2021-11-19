import { MouseEvent as SyntheticMouseEvent, MutableRefObject } from 'react';

import { Vector2 } from '../../Utils/engine/models/Vector2';
import { useEventListener } from '../../Utils/hooks/useEventListener';

const LEFT_MOUSE_BUTTON = 0;

export function useCanvasDraw(mousePos: MutableRefObject<Vector2>, canvas: MutableRefObject<HTMLCanvasElement>, canvasContext: MutableRefObject<CanvasRenderingContext2D>) {
    function onMouseDown(event: SyntheticMouseEvent): void {
        if (event.button === LEFT_MOUSE_BUTTON) {
            draw();
        }
    }

    function draw(): void {
        canvasContext.current.fillStyle = "#000000";
        const {x, y} = mousePos.current;

        canvasContext.current.fillRect (x - 2.5, y - 2.5, 5, 5);
    }

    useEventListener('mousedown', (event: any) => onMouseDown(event as SyntheticMouseEvent), canvas);
}