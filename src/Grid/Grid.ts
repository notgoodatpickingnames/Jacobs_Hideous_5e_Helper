import { GameObject, WorldPosition } from '../Utils/engine';
import { Vector2 } from '../Utils/engine/Vector2';

export class Grid extends GameObject {
    public squareCountX: number;
    public squareCountY: number;

    public squareSizeInPixels: number;

    constructor(width: number, height: number, squareSize: number) {
        super({
            position: new Vector2(0, 0),
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
            const xOffset = x * this.squareSizeInPixels;

            canvasContext.moveTo(this.position.x + xOffset, this.position.y);
            canvasContext.lineTo(this.position.x + xOffset, this.position.y + this.height);
        }

        for (let y = 0; y <= this.height / this.squareSizeInPixels; y++) {
            const yOffset = y * this.squareSizeInPixels;

            canvasContext.moveTo(this.position.x, this.position.y + yOffset);
            canvasContext.lineTo(this.position.x + this.width, this.position.y + yOffset);
        }

        canvasContext.strokeStyle = "white";
        canvasContext.stroke();
    }
}