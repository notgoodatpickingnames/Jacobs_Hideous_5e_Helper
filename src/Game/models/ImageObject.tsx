import { GameObject } from '../../Utils/engine';
import { Vector2 } from '../../Utils/engine/Vector2';

export class ImageObject extends GameObject {
    private clicked = false;

    constructor(position: Vector2, width: number, height: number, image: HTMLImageElement, name: string) {
        super({
            position,
            height,
            width,
            image,
            layer: 100,
        });

        this.image.height = this.height;
        this.image.width = this.width;

        this.name = name;;
    }

    public onClick(): void {
        this.clicked = true;
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.drawImage(this.image, this.transform.position.x - (this.image.width / 2), this.transform.position.y - (this.image.height / 2), this.image.width, this.image.height);
    }

    public clone(position: Vector2): ImageObject {
        return new ImageObject(position, this.width, this.height, this.image, this.name);
    }
}