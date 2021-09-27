import { Vector2 } from '../vector2';

export function difference(pointA: Vector2, pointB: Vector2): Vector2 {
    const diffX = pointA.x - pointB.x;
    const diffY = pointA.y - pointB.y;

    return new Vector2(diffX, diffY);
}