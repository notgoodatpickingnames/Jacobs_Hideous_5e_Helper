import { v4 as uuid } from 'uuid';

import { Rect } from '../../Game/models/rect';
import { Transform } from './Transform';
import { Vector2 } from './Vector2';

interface IGameObject {
    position: Vector2,
    width: number,
    height: number,
    color?: string,
    imgSource?: string,
    layer?: number
}

export class GameObject {
    public gameObjectId: string;
    
    public transform: Transform = new Transform();

    public color: string;
    public imgSource: string;

    public width: number;
    public height: number;

    public layer: number;

    private halfWidth: number;
    private halfHeight: number;

    private boundingRect: Rect;

    constructor(gameObject: IGameObject) {
        this.gameObjectId = uuid();

        this.transform.positionInWorld = gameObject.position;
        this.width = gameObject.width;
        this.height = gameObject.height;
        this.color = gameObject.color;
        this.imgSource = gameObject.imgSource;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        const left = this.transform.position.x - this.halfWidth;
        const right = this.transform.position.x + this.halfWidth;
        const bottom = this.transform.position.y - this.halfHeight;
        const top = this.transform.position.y + this.halfHeight;

        this.boundingRect = new Rect(left, right, top, bottom);
        
        this.layer = gameObject.layer;
    }

    public get position(): Vector2 {
        return this.transform.position;
    }

    public doesPointCollide(point: Vector2): boolean {
        const isWithinXBounds = point.x >= this.boundingRect.left && point.x <= this.boundingRect.right;
        const isWithinYBounds = point.y >= this.boundingRect.bottom && point.y <= this.boundingRect.top;

        return isWithinXBounds && isWithinYBounds;
    }

    public update(worldPanState: Vector2): void {
        
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
    }
}