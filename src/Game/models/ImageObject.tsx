import { GameObject } from '../../Utils/engine';
import { MenuItem } from '../../Utils/engine/contextMenu/contextMenu.context';
import { Engine } from '../../Utils/engine/Engine';
import { Vector2 } from '../../Utils/engine/models/Vector2';

export class ImageObject extends GameObject {
    private clicked = false;
    private pickedUp = false;

    private contextMenuOptions: MenuItem[] = [
        {label: 'Pick Up', onClick: (engine: Engine) => this.onPickUp(engine)}
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
        if (!this.pickedUp) {
            engine.contextMenuContext.openContextMenu(this, this.contextMenuOptions);
        } else {
            this.pickedUp = false;
        }
    }

    public update(engine: Engine): void {

    }

    public render(engine: Engine): void {
        const canvasContext = engine.worldContext.canvasContext.current;

        if (this.pickedUp) {
            const mousePositionInWorldSpace = engine.worldContext.mousePositionInWorld.current;
            this.transform.position = mousePositionInWorldSpace;
        }

        canvasContext.drawImage(this.image, this.transform.position.x - (this.image.width / 2), this.transform.position.y - (this.image.height / 2), this.image.width, this.image.height);
    }

    public clone(position: Vector2): ImageObject {
        return new ImageObject(position, this.width, this.height, this.image, this.name);
    }

    private onPickUp(engine: Engine): void {
        console.log('THIS GUY', this, 'test');
        engine.contextMenuContext.closeContextMenu();
        this.pickedUp = true;
    }
}