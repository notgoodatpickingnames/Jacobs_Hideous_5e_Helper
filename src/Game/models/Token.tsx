import { GameObject } from '../../Utils/engine';
import { Vector2 } from '../../Utils/engine/Vector2';

export class Token extends GameObject {
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

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.drawImage(this.image, this.transform.position.x - this.image.width, this.transform.position.y - this.image.height, this.image.width, this.image.height);
    }
}