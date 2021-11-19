import { DragEvent, useState } from 'react';

import useEventListener from '../../Utils/hooks/useEventListener';
import { ImageObject } from '../gameObjectTypes/ImageObject';

export function useMouseFollowImage(onDragEnd: (event: MouseEvent, objectBeingDragged: ImageObject) => void) {
    const [tokenBeingDragged, setTokenBeingDragged] = useState<ImageObject>();

    function onDragStart(event: DragEvent, token: ImageObject) {
        setTokenBeingDragged(token);
    }

    function _onDragEnd(event: MouseEvent): void {
        onDragEnd(event, tokenBeingDragged);
        setTokenBeingDragged(undefined);
    }

    useEventListener('mouseup', (event) => _onDragEnd(event as MouseEvent));

    return {tokenBeingDragged, onDragStart}
}