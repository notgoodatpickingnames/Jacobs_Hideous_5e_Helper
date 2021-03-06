import { v4 as uuid } from 'uuid';

import { Engine } from '../Engine';
import { Input } from '../input/input';
import { Rect } from './rect';
import { Transform } from './Transform';
import { Vector2 } from './Vector2';

export interface IGameObject {
    gameObjectId?: string;
    position: Vector2;
    width: number;
    height: number;
    color?: string;
    image?: HTMLImageElement;
    layer: number;
    isVisible?: boolean;
}

export class GameObject {
    public gameObjectId: string;
    public name: string = '';
    
    public transform: Transform = new Transform();

    public color: string;
    public image = new Image();

    public width: number;
    public height: number;

    public layer: number;

    private halfWidth: number;
    private halfHeight: number;
    
    private isVisible: boolean;

    protected engine: Engine;

    constructor(gameObject: IGameObject) {
        this.gameObjectId = Boolean(gameObject.gameObjectId) ? gameObject.gameObjectId : uuid();

        this.transform.setPositionInWorld(gameObject.position);
        this.width = gameObject.width;
        this.height = gameObject.height;
        this.color = gameObject.color;
        this.image = gameObject.image;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
        
        this.layer = gameObject.layer || 0;

        this.isVisible = gameObject.isVisible || true;
    }

    public get position(): Vector2 {
        return this.transform.position;
    }

    public get boundingRectInWorld(): Rect {
        const left = this.transform.positionInWorld.x - this.halfWidth;
        const right = this.transform.positionInWorld.x + this.halfWidth;
        const bottom = this.transform.positionInWorld.y - this.halfHeight;
        const top = this.transform.positionInWorld.y + this.halfHeight;

        return new Rect(left, right, top, bottom);
    }

    public get boundingRect(): Rect {
        const left = this.transform.positionInWorld.x - this.halfWidth;
        const right = this.transform.positionInWorld.x + this.halfWidth;
        const bottom = this.transform.positionInWorld.y - this.halfHeight;
        const top = this.transform.positionInWorld.y + this.halfHeight;

        return new Rect(left, right, top, bottom);
    }

    public doesPointCollide(point: Vector2): boolean {
        const isWithinXBounds = point.x >=  this.boundingRectInWorld.left && point.x <= this.boundingRectInWorld.right;
        const isWithinYBounds = point.y <= this.boundingRectInWorld.top && point.y >= this.boundingRectInWorld.bottom;

        return isWithinXBounds && isWithinYBounds;
    }

    public addEngine(engine: Engine): void {
        this.engine = engine;
    }

    public get inputs(): Input {
        return this.engine.inputContext.inputs.current;
    }

    public update(): void {}

    public render(): void {}

    public onClick(): void {}
}