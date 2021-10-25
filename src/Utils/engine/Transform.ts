import { WorldPosition } from './globalValues';
import { Vector2 } from './Vector2';

export class Transform {
    public positionInWorld: Vector2 = new Vector2(0, 0);

    constructor() {}

    public translate(translation: Vector2): void {
        this.positionInWorld = this.positionInWorld.add(translation);
    }

    public get position(): Vector2 {
        return this.positionInWorld.add(WorldPosition);
    }
}