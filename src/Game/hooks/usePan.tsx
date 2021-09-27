import { MouseEvent as SyntheticMouseEvent, useCallback, useRef, useState } from 'react';

import { Vector2 } from '../../Utils/vector2';

const MIDDLE_MOUSE_BUTTON = 1;

const ORIGIN = Object.freeze({x: 0, y: 0})
export default function usePan() {
    const [panState, setPanState] = useState<Vector2>(ORIGIN)
  
    const lastPointRef = useRef(ORIGIN)
  
    const pan = useCallback((event: MouseEvent) => {
        const lastPoint = lastPointRef.current
        const point = {x: event.pageX, y: event.pageY}
        lastPointRef.current = point
  
        setPanState(panState => {
            const delta = {
                x: lastPoint.x - point.x,
                y: lastPoint.y - point.y
            }
            const offset = {
                x: panState.x + delta.x,
                y: panState.y + delta.y
            }
  
            return offset;
        });
    }, []);
  
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
  
    return [panState, startPan] as const;
}