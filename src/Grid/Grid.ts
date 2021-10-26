import { GameObject } from '../Utils/engine';
import { Vector2 } from '../Utils/engine/Vector2';

export class Grid extends GameObject {
    public squareSizeInPixels: number;

    private originalPos: Vector2;

    constructor(width: number, height: number, squareSize: number) {
        super({
            position: new Vector2(width / 2, height / 2),
            width,
            height,
            layer: 10,
        });

        this.originalPos = this.position;

        this.squareSizeInPixels = squareSize;
    }

    public update(): void {
        this.resetGridPosition();
    }

    private resetGridPosition(): void{
        const difference = this.position.subtract(this.originalPos);
        
        if (Math.abs(difference.x) >= this.squareSizeInPixels / 2) {
            this.transform.translate(new Vector2(-this.squareSizeInPixels * Math.floor(difference.x / this.squareSizeInPixels), 0));
        }

        if (Math.abs(difference.y) >= this.squareSizeInPixels / 2) {
            this.transform.translate(new Vector2(0, -this.squareSizeInPixels * Math.floor(difference.y / this.squareSizeInPixels)));
        }
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.lineWidth = 1;

        canvasContext.beginPath();

        this.renderVerticalLines(canvasContext);
        this.renderHorizontalLines(canvasContext);

        canvasContext.strokeStyle = 'white';
        canvasContext.stroke();
    }

    private renderVerticalLines(canvasContext: CanvasRenderingContext2D): void {
        const adjustedXPosition = this.position.x - (40 * this.squareSizeInPixels) - (this.width / 2);

        for (let x = 0; x <= (this.width / this.squareSizeInPixels) + 80; x++) {
            const xOffset = x * this.squareSizeInPixels;

            canvasContext.moveTo(adjustedXPosition + xOffset, 0);
            canvasContext.lineTo(adjustedXPosition + xOffset, this.height);
        }
    }

    private renderHorizontalLines(canvasContext: CanvasRenderingContext2D): void {
        const adjustedYPosition = this.position.y - (40 * this.squareSizeInPixels) - (this.height / 2);

        for (let y = 0; y <= (this.height / this.squareSizeInPixels) + 80; y++) {
            const yOffset = y * this.squareSizeInPixels;

            canvasContext.moveTo(0, adjustedYPosition + yOffset);
            canvasContext.lineTo(this.width, adjustedYPosition + yOffset);
        }
    }
}