import { IImageObject, ImageObject } from './ImageObject';

export interface INPCObject extends IImageObject {
    health: number;
}

export class NPCObject extends ImageObject {
    public health: number;

    constructor(npcObject: INPCObject) {
        super(npcObject);

        this.health = npcObject.health;

        this.contextMenuOptions.push(
            {label: 'Reduce Health', onClick: () => this.onReduceHealth()}
        )
    }

    public render(): void {
        super.render();

        // Render health bar somewhere.
    }

    private onReduceHealth(): void {
        console.log('Reduce Health Was Pressed');
    }
}