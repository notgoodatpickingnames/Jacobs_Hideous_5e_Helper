import { WorldPosition } from '../globalValues';
import { Vector2 } from './Vector2';

export class Transform {
    private _positionInWorld: Vector2 = new Vector2(0, 0);

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {}

    public setPositionInWorld(position: Vector2): void {
        this._positionInWorld = new Vector2(position.x, position.y);
    }

    public get positionInWorld(): Vector2 {
        return this._positionInWorld;
    }

    public translate(translation: Vector2): void {
        this._positionInWorld = this._positionInWorld.add(translation);
    }

    public get position(): Vector2 {
        return this._positionInWorld.add(WorldPosition);
    }

    public set position(pos: Vector2) {
        this._positionInWorld = this._positionInWorld.set(pos.x, pos.y);
    }
}