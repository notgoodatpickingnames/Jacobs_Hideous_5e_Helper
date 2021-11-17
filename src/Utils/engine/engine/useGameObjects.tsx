import { useRef } from 'react';

import { Engine } from '../Engine';
import { GameObject } from '../models/GameObject';

export function useGameObjects() {
    const gameObjects = useRef<Map<string, GameObject>>(new Map([]));
    const gameObjectsByLayer = useRef<Map<number, Map<string, GameObject>>>(new Map([]));

    const engine = useRef<Engine>();

    function onEngineCreated(_engine: Engine): void {
        if (!Boolean(engine.current)) {
            engine.current = _engine;
            gameObjects.current.forEach((gameObject) => gameObject.addEngine(engine.current));
        }
    }

    function addGameObject(gameObject: GameObject): void {
        gameObject.addEngine(engine.current);
        gameObjects.current.set(gameObject.gameObjectId, gameObject);

        let layer = gameObjectsByLayer.current.get(gameObject.layer);

        if (!Boolean(layer)) {
            gameObjectsByLayer.current.set(gameObject.layer, new Map<string, GameObject>());
            layer = gameObjectsByLayer.current.get(gameObject.layer);
        }

        layer.set(gameObject.gameObjectId, gameObject);
    }

    function getGameObject(gameObjectId: string): GameObject {
        return gameObjects.current.get(gameObjectId);
    }

    function removeGameObject(gameObject: GameObject): void {
        gameObjects.current.delete(gameObject.gameObjectId);

        const layer = gameObjectsByLayer.current.get(gameObject.layer);
        layer.delete(gameObject.gameObjectId);
    }

    return [gameObjects, gameObjectsByLayer, addGameObject, getGameObject, removeGameObject, onEngineCreated] as const;
}