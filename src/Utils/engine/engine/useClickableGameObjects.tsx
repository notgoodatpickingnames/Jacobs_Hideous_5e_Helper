import { MouseEvent as SyntheticMouseEvent, MutableRefObject } from 'react';

import useEventListener from '../../hooks/useEventListener';
import { Engine } from '../Engine';
import { GameObject } from '../models/GameObject';
import { useWorldContext } from '../world/world.context';

const LEFT_MOUSE_BUTTON = 0;

export function useClickableGameObjects(gameObjectsByLayer: MutableRefObject<Map<number, Map<string, GameObject>>>, engine: Engine) {
    const {canvas, mousePositionInWorld} = useWorldContext();

    function onMouseDown(mouseEvent: SyntheticMouseEvent): void {
        if (mouseEvent.button === LEFT_MOUSE_BUTTON) {
            const layerKeys = Array.from(gameObjectsByLayer.current.keys()).sort((a, b) => b-a);

            for(let x = 0; x < layerKeys.length; x++) {
                const layerKey = layerKeys[x];
                const gameObjectKeys = Array.from(gameObjectsByLayer.current.get(layerKey).keys());

                for (let y = gameObjectKeys.length - 1; y >= 0; y--) {
                    const gameObjectKey = gameObjectKeys[y];
                    const gameObject = gameObjectsByLayer.current.get(layerKey).get(gameObjectKey);
                    if (gameObject.doesPointCollide(mousePositionInWorld.current)) {
                        gameObject.onClick();

                        return;
                    }
                }
            }
        }
    }

    function onMouseUp(mouseEvent: SyntheticMouseEvent): void {

    }

    useEventListener('mousedown', (event: any) => onMouseDown(event as SyntheticMouseEvent), canvas);
    useEventListener('mouseup', (event: any) => onMouseUp(event as SyntheticMouseEvent), canvas);
}