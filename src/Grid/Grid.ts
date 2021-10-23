import { GameObject } from '../Utils/engine/gameObject';
import { Vector2 } from '../Utils/vector2';

export class Grid extends GameObject {
    public squareCountX: number;
    public squareCountY: number;

    public squareSizeInPixels: number;

    constructor(width: number, height: number, squareSize: number) {
        super({
            transform: new Vector2(0, 0),
            width,
            height
        });

        this.squareCountX = width;
        this.squareCountY = height;

        this.squareSizeInPixels = squareSize;
    }

    public get pixelWidth(): number {
        return this.squareCountX * this.squareSizeInPixels;
    }

    public get pixelHeight(): number {
        return this.squareCountY * this.squareSizeInPixels;
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.lineWidth = .2;

        canvasContext.beginPath();

        for (let x = 0; x <= this.width / this.squareSizeInPixels; x++) {
            canvasContext.moveTo(this.transform.x + (x * this.squareSizeInPixels), this.transform.y - this.height / 2);
            canvasContext.lineTo((this.transform.x + x * this.squareSizeInPixels), this.transform.y + this.height);
        }

        for (let y = 0; y <= this.height / this.squareSizeInPixels; y++) {
            canvasContext.moveTo(this.transform.x - (this.width / 2), this.transform.y + (y * this.squareSizeInPixels));
            canvasContext.lineTo(this.transform.x + this.width, this.transform.y + (y * this.squareSizeInPixels));
        }

        canvasContext.strokeStyle = "white";
        canvasContext.stroke();
    }
}