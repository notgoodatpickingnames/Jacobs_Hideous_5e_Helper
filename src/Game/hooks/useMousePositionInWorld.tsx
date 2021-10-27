import { MutableRefObject } from 'react';

import { Vector2 } from '../../Utils/engine/Vector2';
import useEventListener from '../../Utils/hooks/useEventListener';

export function useMousePositionInWorld(mousePosition: MutableRefObject<Vector2>, offset: MutableRefObject<Vector2>, scale: MutableRefObject<number>, canvas: MutableRefObject<HTMLCanvasElement>) {
    function onMouseMove(event: MouseEvent): void {
        const mousePositionOnPage = new Vector2(event.pageX, event.pageY);

        const mousePositionOverCanvas = getMousePositionOverCanvas(mousePositionOnPage);

        mousePosition.current = mousePositionOverCanvas;
    }

    function getMousePositionOverCanvas(mousePositionOnPage: Vector2): Vector2 {
        const rect = canvas.current.getBoundingClientRect();

        const xPos = mousePositionOnPage.x - rect.left + offset.current.x;
        const yPos = mousePositionOnPage.y - rect.top + offset.current.y;

        const scaledXPos = xPos / scale.current;
        const scaledYPos = yPos / scale.current;

        const positionOverCanvas = new Vector2(scaledXPos, scaledYPos);

        return positionOverCanvas;
    }
    
    useEventListener('mousemove', (event: Event) => onMouseMove(event as MouseEvent), canvas);

    return mousePosition;
}