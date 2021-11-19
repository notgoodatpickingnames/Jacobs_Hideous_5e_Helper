import { MutableRefObject, RefObject } from 'react';

import { useEventListener } from '../../Utils/hooks/useEventListener';

type ScaleOpts = {
  direction: 'up' | 'down'
  interval: number
}

const MIN_SCALE = 1;
const MAX_SCALE = 10;

export default function useScale(canvas: RefObject<HTMLCanvasElement>, scale: MutableRefObject<number>) {
    const updateScale = ({direction, interval}: ScaleOpts) => {
        if (direction === 'down' && scale.current + interval < MAX_SCALE) {
            scale.current = scale.current + interval;
        } else if (direction === 'down') {
            scale.current = MAX_SCALE;
        } else if (direction === 'up' && scale.current - interval > MIN_SCALE) {
            scale.current = scale.current - interval;
        } else if (direction === 'up') {
            scale.current = MIN_SCALE;
        }
    }

    function onWheel(event: any): void {
        event.preventDefault();

        updateScale({
            direction: event.deltaY > 0 ? 'up' : 'down',
            interval: 0.1
        });
    }

    useEventListener('wheel', onWheel, canvas);

    return scale;
}