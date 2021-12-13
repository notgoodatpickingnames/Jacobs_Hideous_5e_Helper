import { IAsset } from './IAsset';

export class Asset {
    public assetId: string;
    public creatorId: string;
    public name: string;
    public image = new Image();

    constructor(asset: IAsset) {
        this.assetId = asset.assetId;
        this.creatorId = asset.creatorId;
        this.name = asset.name;
        this.image.src = asset.source;
    }
}