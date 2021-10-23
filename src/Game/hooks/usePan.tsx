import { Dispatch, MouseEvent as SyntheticMouseEvent, SetStateAction, useCallback, useRef } from 'react';

import { Vector2 } from '../../Utils/vector2';

const MIDDLE_MOUSE_BUTTON = 1;

const ORIGIN = Object.freeze({x: 0, y: 0});

export default function usePan(setPanState: Dispatch<SetStateAction<Vector2>>,) {
    const lastPointRef = useRef(ORIGIN)
  
    const pan = useCallback((event: MouseEvent) => {
        const lastPoint = lastPointRef.current
        const point = {x: event.pageX, y: event.pageY}
        lastPointRef.current = point
  
        setPanState((panState: Vector2) => {
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
    }, [setPanState]);
  
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