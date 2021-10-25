export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    public equals(other: Vector2): boolean {
        return this.x === other.x && this.y === other.y;
    }

    public difference(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
}