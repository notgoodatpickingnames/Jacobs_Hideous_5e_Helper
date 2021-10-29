import { GameObject } from '../../Utils/engine';
import { Vector2 } from '../../Utils/engine/Vector2';

export class Token extends GameObject {
    private clicked = false;

    constructor(position: Vector2, width: number, height: number, image: HTMLImageElement) {
        super({
            position,
            height,
            width,
            image,
            layer: 100,
        });

        this.image.height = this.height;
        this.image.width = this.width;

        this.name = 'Token';
    }

    public onClick(): void {
        console.log('I was clicked!!');
        this.clicked = true;
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.drawImage(this.image, this.transform.position.x - (this.image.width / 2), this.transform.position.y - (this.image.height / 2), this.image.width, this.image.height);

        if (this.clicked) {
            canvasContext.beginPath();

            canvasContext.lineWidth = 10;

            // Top Line
            canvasContext.moveTo(this.boundingRect.left, this.boundingRect.top);
            canvasContext.lineTo(this.boundingRect.right, this.boundingRect.bottom);

            canvasContext.strokeStyle = 'red';
            canvasContext.stroke();
        }
    }
}