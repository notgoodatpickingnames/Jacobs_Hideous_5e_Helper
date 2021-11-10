import { MutableRefObject, useRef } from 'react';

import { WorldPosition } from '../../Utils/engine';
import { Vector2 } from '../../Utils/engine/Vector2';
import useEventListener from '../../Utils/hooks/useEventListener';

export function useMousePositionInWorld(scale: MutableRefObject<number>, canvas: MutableRefObject<HTMLCanvasElement>) {
    const mousePositionInWorld = useRef<Vector2>(Vector2.zero);
    
    function onMouseMove(event: MouseEvent): void {
        const mousePositionOnPage = new Vector2(event.pageX, event.pageY);

        const mousePositionOverCanvas = getMousePositionOverCanvas(mousePositionOnPage);

        mousePositionInWorld.current = mousePositionOverCanvas;
    }

    function getMousePositionOverCanvas(mousePositionOnPage: Vector2): Vector2 {
        const xPos = (mousePositionOnPage.x / scale.current) - WorldPosition.x;
        const yPos = (mousePositionOnPage.y / scale.current) - WorldPosition.y;

        return new Vector2(xPos, yPos);
    }
    
    useEventListener('mousemove', (event: Event) => onMouseMove(event as MouseEvent));

    return mousePositionInWorld;
}