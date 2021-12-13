import { GameObject } from '../../Utils/engine';
import { MenuItem } from '../../Utils/engine/contextMenu/contextMenu.context';
import { Engine } from '../../Utils/engine/Engine';
import { Vector2 } from '../../Utils/engine/models/Vector2';
import { GameObjectTypes } from '../gameManager/scene/gameObjectTypes';
import { GameObjectSceneDetail } from '../gameManager/scene/models/gameObjectSceneDetail';

export interface FirestoreImageObject {
    assetId: string,
    name: string,
}

export class ImageObject extends GameObject {
    public assetId: string;
    public type = GameObjectTypes.image;
    
    private clicked = false;
    private pickedUp = false;

    protected contextMenuOptions: MenuItem[] = [
        {label: 'Pick Up', onClick: (engine: Engine) => this.onPickUp()}
    ]

    constructor(gameObjectId: string, position: Vector2, width: number, height: number, image: HTMLImageElement, assetId: string, name: string) {
        super({
            gameObjectId,
            position,
            height,
            width,
            image,
            layer: 100, // TODO - Make this dynamicly set by user.
        });

        this.image.height = this.height;
        this.image.width = this.width;

        this.assetId = assetId;

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
            if (this.inputs.getKeyHeld('shift')) {
                const mousePositionInWorldSpace = this.engine.inputContext.gridPositionMouseIsOver.current;
                this.transform.position = mousePositionInWorldSpace;
            } else {
                const mousePositionInWorldSpace = this.engine.inputContext.mousePositionInWorld.current;
                this.transform.position = mousePositionInWorldSpace;
            }
        }
    }

    public render(): void {
        const canvasContext = this.engine.worldContext.canvasContext.current;

        canvasContext.drawImage(this.image, this.transform.position.x - (this.image.width / 2), this.transform.position.y - (this.image.height / 2), this.image.width, this.image.height);
    }

    public clone(gameObjectId: string, position: Vector2): ImageObject {
        return new ImageObject(gameObjectId, position, this.width, this.height, this.image, this.assetId, this.name);
    }

    public asFirestoreObject(): FirestoreImageObject {
        return {
            name: this.name,
            assetId: this.assetId,
        }
    }

    public asFirestoreSceneDetailObject(): GameObjectSceneDetail {
        return {
            gameObjectId: this.gameObjectId,
            height: this.height,
            width: this.width,
            layer: this.layer,
            x: this.transform.positionInWorld.x,
            y: this.transform.positionInWorld.y,
            rotation: 0, // TODO - Make Dynamic After Adding Rotation
            isVisible: true, // TODO - Make Dynamic After Adding Is Visible
        }
    }

    private onPickUp(): void {
        this.engine.contextMenuContext.closeContextMenu();
        this.pickedUp = true;
    }
}