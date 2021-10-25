import { Vector2 } from '../engine/Vector2';

export function scale(point: Vector2, scale: number): Vector2 {
    const scaledX = point.x / scale;
    const scaledY = point.y / scale;

    return new Vector2(scaledX, scaledY);
}