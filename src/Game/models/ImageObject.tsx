import { GameObject } from '../../Utils/engine';
import { MenuItem } from '../../Utils/engine/contextMenu.context';
import { Engine } from '../../Utils/engine/Engine';
import { Vector2 } from '../../Utils/engine/Vector2';

export class ImageObject extends GameObject {
    private clicked = false;
    private pickedUp = false;

    private contextMenuOptions: MenuItem[] = [
        {label: 'Pick Up', onClick: this.onPickUp}
    ]

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

        this.name = name;
    }

    public onClick(engine: Engine): void {
        engine.contextMenuContext.openContextMenu(this, this.contextMenuOptions);
    }

    public render(engine: Engine): void {
        const canvasContext = engine.worldContext.canvasContext.current;

        if (this.pickedUp) {
            const mousePositionInWorldSpace = engine.worldContext.mousePositionInWorld.current;
            this.transform.position.set(mousePositionInWorldSpace.x, mousePositionInWorldSpace.y);
        }

        canvasContext.drawImage(this.image, this.transform.position.x - (this.image.width / 2), this.transform.position.y - (this.image.height / 2), this.image.width, this.image.height);
    }

    public clone(position: Vector2): ImageObject {
        return new ImageObject(position, this.width, this.height, this.image, this.name);
    }

    private onPickUp(): void {
        this.pickedUp = true;
    }
}