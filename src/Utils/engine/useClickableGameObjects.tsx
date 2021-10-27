import { MouseEvent as SyntheticMouseEvent, MutableRefObject } from 'react';

import { useWorldContext } from '../../Game/context/world.context';
import { useMousePositionInWorld } from '../../Game/hooks/useMousePositionInWorld';
import useEventListener from '../hooks/useEventListener';
import { GameObject } from './GameObject';

const LEFT_MOUSE_BUTTON = 0;

export function useClickableGameObjects(gameObjectsByLayer: MutableRefObject<Map<number, Map<string, GameObject>>>) {
    const {canvas, mousePositionInWorld} = useWorldContext();

    function onMouseDown(mouseEvent: SyntheticMouseEvent): void {
        if (mouseEvent.button === LEFT_MOUSE_BUTTON) {
            const layerKeys = Array.from(gameObjectsByLayer.current.keys());

            // Reverse search through all gameobjects by layer so we can get whatever the top one is.
            for(let x = layerKeys.length - 1; x >= 0; x--) {
                const layerKey = layerKeys[x];
                const gameObjectKeys = Array.from(gameObjectsByLayer.current.get(layerKey).keys());

                for (let y = gameObjectKeys.length - 1; y >= 0; y--) {
                    const gameObjectKey = gameObjectKeys[y];
                    const gameObject = gameObjectsByLayer.current.get(layerKey).get(gameObjectKey);
                    if (gameObject.doesPointCollide(mousePositionInWorld.current)) {
                        console.log('Found Top Level GameObject', gameObject);
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