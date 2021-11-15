import { GameObject } from '../../Utils/engine';
import { MenuItem } from '../../Utils/engine/contextMenu/contextMenu.context';
import { Engine } from '../../Utils/engine/Engine';
import { Vector2 } from '../../Utils/engine/models/Vector2';

export class ImageObject extends GameObject {
    private clicked = false;
    private pickedUp = false;

    private contextMenuOptions: MenuItem[] = [
        {label: 'Pick Up', onClick: (engine: Engine) => this.onPickUp()}
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

    public onClick(): void {
        if (!this.pickedUp) {
            this.engine.contextMenuContext.openContextMenu(this, this.contextMenuOptions);
        } else {
            this.pickedUp = false;
        }
    }

    public update(): void {
        if (this.pickedUp) {
            const mousePositionInWorldSpace = this.engine.worldContext.mousePositionInWorld.current;
            this.transform.position = mousePositionInWorldSpace;
        }
    }

    public render(): void {
        const canvasContext = this.engine.worldContext.canvasContext.current;

        canvasContext.drawImage(this.image, this.transform.position.x - (this.image.width / 2), this.transform.position.y - (this.image.height / 2), this.image.width, this.image.height);
    }

    public clone(position: Vector2): ImageObject {
        return new ImageObject(position, this.width, this.height, this.image, this.name);
    }

    private onPickUp(): void {
        console.log('THIS GUY', this, 'test');
        this.engine.contextMenuContext.closeContextMenu();
        this.pickedUp = true;
    }
}