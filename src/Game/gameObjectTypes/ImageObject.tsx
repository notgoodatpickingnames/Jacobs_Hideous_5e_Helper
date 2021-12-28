import { MenuItem } from '../../Utils/engine/contextMenu/contextMenu.context';
import { Vector2 } from '../../Utils/engine/models/Vector2';
import { GameObjectTypes } from '../gameManager/scene/gameObjectTypes';
import { ISyncableObject, SyncableObject } from './syncableObject';

export interface FirestoreImageObject {
    assetId: string,
    name: string,
}

export interface IImageObject extends ISyncableObject {
    assetId: string;
    name: string;
}

export class ImageObject extends SyncableObject {
    public assetId: string;
    
    private clicked = false;
    private pickedUp = false;

    protected contextMenuOptions: MenuItem[] = [
        {label: 'Pick Up', onClick: () => this.onPickUp()}
    ];

    constructor(imageObject: IImageObject) {
        super(imageObject);

        this.image.height = this.height;
        this.image.width = this.width;

        this.assetId = imageObject.assetId;
        this.name = imageObject.name;

        this.type = GameObjectTypes.image;
    }

    public onClick(): void {
        if (this.inputs.getKeyHeld('ControlLeft')) {
            this.onPickUp();
            return;
        }

        if (!this.pickedUp) {
            this.engine.contextMenuContext.openContextMenu(this, this.contextMenuOptions);
        } else {
            this.onDrop();
        }
    }

    public update(): void {
        if (this.pickedUp) {
            if (this.inputs.getKeyHeld('ShiftLeft') || this.inputs.getKeyHeld('ShiftRight')) {
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
        return new ImageObject({
            gameObjectId,
            position,
            width: this.width,
            height: this.height,
            image: this.image,
            assetId: this.assetId,
            name: this.name,
            gameId: this.gameId,
            sceneId: this.sceneId,
            layer: this.layer,
        });
    }

    public asFirestoreObject(): FirestoreImageObject {
        return {
            name: this.name,
            assetId: this.assetId,
        }
    }

    private onPickUp(): void {
        this.engine.contextMenuContext.closeContextMenu();
        this.pickedUp = true;
    }

    private onDrop(): void {
        this.pickedUp = false;

        this.sync();
    }
}