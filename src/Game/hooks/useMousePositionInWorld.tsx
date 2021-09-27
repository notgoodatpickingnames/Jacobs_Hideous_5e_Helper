import { MutableRefObject, useEffect, useRef, useState } from 'react';

import useEventListener from '../../Utils/hooks/useEventListener';
import { Vector2 } from '../../Utils/vector2';

export function useMousePositionInWorld(offset: Vector2, zoom: Vector2, canvas: MutableRefObject<HTMLCanvasElement>) {
    const mousePosition = useRef<Vector2>(Vector2.zero);

    function onMouseMove(event: MouseEvent): void {
        const mousePositionOnPage = new Vector2(event.pageX, event.pageY);

        const mousePositionOverCanvas = getMousePositionOverCanvas(mousePositionOnPage);

        mousePosition.current = mousePositionOverCanvas;
    }

    function getMousePositionOverCanvas(mousePositionOnPage: Vector2): Vector2 {
        const rect = canvas.current.getBoundingClientRect();

        const xPos = mousePositionOnPage.x - rect.left + offset.x;
        const yPos = mousePositionOnPage.y - rect.top + offset.y;

        const positionOverCanvas = new Vector2(xPos, yPos);

        return positionOverCanvas;
    }
    
    useEventListener('mousemove', (event: Event) => onMouseMove(event as MouseEvent), canvas);

    return mousePosition;
}