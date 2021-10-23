import { v4 as uuid } from 'uuid';

import { Rect } from '../../Game/models/rect';
import { Vector2 } from '../vector2';

interface IGameObject {
    transform: Vector2,
    width: number,
    height: number,
    color?: string,
    imgSource?: string,
    layer?: number
}

export class GameObject {
    public gameObjectId: string;
    
    public transform: Vector2;

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

        this.transform = gameObject.transform;
        this.width = gameObject.width;
        this.height = gameObject.height;
        this.color = gameObject.color;
        this.imgSource = gameObject.imgSource;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        const left = this.transform.x - this.halfWidth;
        const right = this.transform.x + this.halfWidth;
        const bottom = this.transform.y - this.halfHeight;
        const top = this.transform.y + this.halfHeight;

        this.boundingRect = new Rect(left, right, top, bottom);
        
        this.layer = gameObject.layer;
    }

    public doesPointCollide(point: Vector2): boolean {
        const isWithinXBounds = point.x >= this.boundingRect.left && point.x <= this.boundingRect.right;
        const isWithinYBounds = point.y >= this.boundingRect.bottom && point.y <= this.boundingRect.top;

        return isWithinXBounds && isWithinYBounds;
    }

    public render(canvasContext: CanvasRenderingContext2D, ...params: any[]): void {
        console.log('Lowest Level Render Called In Game Object');
    }
}