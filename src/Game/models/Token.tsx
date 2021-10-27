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
    }

    public onClick(): void {
        console.log('I was clicked!!');
        this.clicked = true;
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.drawImage(this.image, this.transform.position.x - this.image.width, this.transform.position.y - this.image.height, this.image.width, this.image.height);

        if (this.clicked) {
            canvasContext.beginPath();

            canvasContext.lineWidth = 1;

            // Top Line
            canvasContext.moveTo(this.position.x - 1, this.position.y - 1);
            canvasContext.lineTo(this.position.x - 1 + this.width + 1, this.position.y - 1);

            canvasContext.strokeStyle = 'red';
            canvasContext.stroke();
        }
    }
}