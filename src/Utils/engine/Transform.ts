import { WorldPosition } from './globalValues';
import { Vector2 } from './Vector2';

export class Transform {
    public positionInWorld: Vector2 = new Vector2(0, 0);

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {}

    public translate(translation: Vector2): void {
        this.positionInWorld = this.positionInWorld.add(translation);
    }

    public get position(): Vector2 {
        return this.positionInWorld.add(WorldPosition);
    }

    public set position(pos: Vector2) {
        this.positionInWorld = this.positionInWorld.subtract(WorldPosition);
    }
}