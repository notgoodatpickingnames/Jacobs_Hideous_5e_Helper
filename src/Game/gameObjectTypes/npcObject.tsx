import { Engine } from '../../Utils/engine/Engine';
import { Vector2 } from '../../Utils/engine/models/Vector2';
import { Asset } from '../gameManager/assets/models/asset';
import { ImageObject } from './ImageObject';

export class NPCObject extends ImageObject {
    public health: number;

    constructor(gameObjectId: string, position: Vector2, width: number, height: number, imageAsset: Asset, name: string, health: number) {
        super(
            gameObjectId,
            position,
            height,
            width,
            imageAsset.image,
            imageAsset.assetId,
            name
        );

        this.health = health;
        this.contextMenuOptions.push(
            {label: 'Reduce Health', onClick: (engine: Engine) => this.onReduceHealth()}
        )
    }

    public render(): void {
        const canvasContext = this.engine.worldContext.canvasContext.current;

        canvasContext.drawImage(this.image, this.transform.position.x - (this.image.width / 2), this.transform.position.y - (this.image.height / 2), this.image.width, this.image.height);
    }

    private onReduceHealth(): void {
        console.log('Reduce Health Was Pressed');
    }
}