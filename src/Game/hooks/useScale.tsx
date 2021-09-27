import { RefObject, useState } from 'react';

import useEventListener from '../../Utils/hooks/useEventListener';

type ScaleOpts = {
  direction: 'up' | 'down'
  interval: number
}

const MIN_SCALE = 1;
const MAX_SCALE = 10;

export default function useScale(canvas: RefObject<HTMLCanvasElement>) {
    const [scale, setScale] = useState(1);

    const updateScale = ({direction, interval}: ScaleOpts) => {
        setScale(currentScale => {
            let scale: number

            if (direction === 'down' && currentScale + interval < MAX_SCALE) {
                scale = currentScale + interval
            } else if (direction === 'down') {
                scale = MAX_SCALE;
            } else if (direction === 'up' && currentScale - interval > MIN_SCALE) {
                scale = currentScale - interval;
            } else if (direction === 'up') {
                scale = MIN_SCALE;
            } else {
                scale = currentScale;
            }

            return scale;
        });
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