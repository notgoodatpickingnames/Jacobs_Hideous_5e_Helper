import { Vector2 } from '../../Utils/vector2';
import { Rect } from './rect';

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

    constructor(transform: Vector2, width: number, height: number, color: string, imgSource: string, layer: number) {
        this.transform = transform;
        this.width = width;
        this.height = height;
        this.color = color;
        this.imgSource = imgSource;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        const left = transform.x - this.halfWidth;
        const right = transform.x + this.halfWidth;
        const bottom = transform.y - this.halfHeight;
        const top = transform.y + this.halfHeight;

        this.boundingRect = new Rect(left, right, top, bottom);
        
        this.layer = layer;
    }

    public doesPointCollide(point: Vector2): boolean {
        const isWithinXBounds = point.x >= this.boundingRect.left && point.x <= this.boundingRect.right;
        const isWithinYBounds = point.y >= this.boundingRect.bottom && point.y <= this.boundingRect.top;

        return isWithinXBounds && isWithinYBounds;
    }
}