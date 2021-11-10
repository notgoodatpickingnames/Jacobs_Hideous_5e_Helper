import { MutableRefObject, useRef } from 'react';

import { WorldPosition } from '../../Utils/engine';
import { Vector2 } from '../../Utils/engine/Vector2';
import useEventListener from '../../Utils/hooks/useEventListener';

export function useMousePositionInWorld(scale: MutableRefObject<number>, canvas: MutableRefObject<HTMLCanvasElement>) {
    const mousePositionInWorld = useRef<Vector2>(Vector2.zero);
    const gridPositionMouseIsOver = useRef<Vector2>(Vector2.zero);
    
    function onMouseMove(event: MouseEvent): void {
        const mousePositionOnPage = new Vector2(event.pageX, event.pageY);

        mousePositionInWorld.current = getMousePositionOverCanvas(mousePositionOnPage);
        gridPositionMouseIsOver.current = getGridPositionMouseIsOver( mousePositionInWorld.current);
    }

    function getMousePositionOverCanvas(mousePositionOnPage: Vector2): Vector2 {
        const xPos = (mousePositionOnPage.x / scale.current) - WorldPosition.x;
        const yPos = (mousePositionOnPage.y / scale.current) - WorldPosition.y;

        return new Vector2(xPos, yPos);
    }

    function getGridPositionMouseIsOver(mousePositionOverCanvas: Vector2): Vector2 {
        const increment = 40;
        const offset = -20;

        const x = Math.round((mousePositionOverCanvas.x - offset) / increment ) * increment + offset;
        const y = Math.round((mousePositionOverCanvas.y - offset) / increment ) * increment + offset;

        return new Vector2(x, y);
    }

    function getPositionInScreenSpace(position: Vector2): Vector2 {
        const xPos = (position.x * scale.current) + WorldPosition.x;
        const yPos = (position.y * scale.current) + WorldPosition.y;

        return new Vector2(xPos, yPos);
    }
    
    useEventListener('mousemove', (event: Event) => onMouseMove(event as MouseEvent));

    return {mousePositionInWorld, gridPositionMouseIsOver, getPositionInScreenSpace};
}