import { Vector2 } from '../vector2';

export function sum(pointA: Vector2, pointB: Vector2): Vector2 {
    const sumX = pointA.x + pointB.x;
    const sumY = pointA.y + pointB.y;

    return new Vector2(sumX, sumY);
}