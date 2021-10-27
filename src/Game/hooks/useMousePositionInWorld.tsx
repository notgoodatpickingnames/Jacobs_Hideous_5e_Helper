import { MutableRefObject, useReducer, useRef } from 'react';

import { WorldPosition } from '../../Utils/engine';
import { Vector2 } from '../../Utils/engine/Vector2';
import useEventListener from '../../Utils/hooks/useEventListener';

export function useMousePositionInWorld(offset: MutableRefObject<Vector2>, scale: MutableRefObject<number>, canvas: MutableRefObject<HTMLCanvasElement>) {
    const mousePositionInWorld = useRef<Vector2>(Vector2.zero);
    
    function onMouseMove(event: MouseEvent): void {
        const mousePositionOnPage = new Vector2(event.pageX, event.pageY);

        const mousePositionOverCanvas = getMousePositionOverCanvas(mousePositionOnPage);

        mousePositionInWorld.current = mousePositionOverCanvas;
    }

    function getMousePositionOverCanvas(mousePositionOnPage: Vector2): Vector2 {
        const xPos = mousePositionOnPage.x - WorldPosition.x;
        const yPos = mousePositionOnPage.y - WorldPosition.y;

        const scaledXPos = xPos / scale.current;
        const scaledYPos = yPos / scale.current;

        const positionOverCanvas = new Vector2(scaledXPos, scaledYPos);

        return positionOverCanvas;
    }
    
    useEventListener('mousemove', (event: Event) => onMouseMove(event as MouseEvent), canvas);

    return mousePositionInWorld;
}