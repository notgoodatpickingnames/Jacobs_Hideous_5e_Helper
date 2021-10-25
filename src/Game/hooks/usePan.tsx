import { MouseEvent as SyntheticMouseEvent, MutableRefObject, useCallback, useRef } from 'react';

import { Vector2 } from '../../Utils/engine/Vector2';

const MIDDLE_MOUSE_BUTTON = 1;

const ORIGIN = Object.freeze({x: 0, y: 0});

export default function usePan(panState: MutableRefObject<Vector2>) {
    const lastPointRef = useRef(ORIGIN)
  
    const pan = useCallback((event: MouseEvent) => {
        const lastPoint = lastPointRef.current;
        const point = {x: event.pageX, y: event.pageY};
        lastPointRef.current = point;
        
        const delta = {
            x: lastPoint.x - point.x,
            y: lastPoint.y - point.y
        }

        const offsetX = panState.current.x + delta.x;
        const offsetY = panState.current.y + delta.y;

        panState.current = new Vector2(offsetX, offsetY);
    }, [panState]);
  
    const endPan = useCallback((event: SyntheticMouseEvent) => {
        if (event.button) {
            document.removeEventListener('mousemove', pan);
            document.removeEventListener('mouseup', (event: any) => endPan(event as SyntheticMouseEvent));
        }
    }, [pan]);
  
    const startPan = useCallback((event: SyntheticMouseEvent) => {
        if (event.button === MIDDLE_MOUSE_BUTTON) {
            document.addEventListener('mousemove', pan);
            document.addEventListener('mouseup', (event: any) => endPan(event as SyntheticMouseEvent));
            lastPointRef.current = {x: event.pageX, y: event.pageY};
        }
    }, [pan, endPan]);
  
    return startPan;
}