import { doc, getFirestore, setDoc } from 'firebase/firestore';

import { GameObject } from '../../Utils/engine';
import { IGameObject } from '../../Utils/engine/models/GameObject';
import { GameObjectTypes } from '../gameManager/scene/gameObjectTypes';
import { GameObjectSceneDetail } from '../gameManager/scene/models/gameObjectSceneDetail';

export interface ISyncableObject extends IGameObject {
    gameId: string;
    sceneId: string;
}

export class SyncableObject extends GameObject {
    public type: GameObjectTypes = GameObjectTypes.image;
    public gameId: string;
    public sceneId: string;

    constructor(syncableObject: ISyncableObject) {
        super(syncableObject);

        this.gameId = syncableObject.gameId;
        this.sceneId = syncableObject.sceneId;
    }

    protected asFirestoreObject(): any {}
    
    private asFirestoreSceneDetailObject(): GameObjectSceneDetail {
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

    public sync(): void {
        const db = getFirestore();

        if (this.type === GameObjectTypes.image) {
            const fireStoreGameObject = this.asFirestoreObject();
            const fireStoreDetailObject = this.asFirestoreSceneDetailObject();

            setDoc(doc(db, `gameObjects/${this.gameId}/gameObjects/${this.gameObjectId}`), {
                type: GameObjectTypes.image,
                ...fireStoreGameObject,
            });

            setDoc(doc(db, `gameObjectsInScene/${this.gameId}/scenes/${this.sceneId}/gameObjects/${this.gameObjectId}`), {
                ...fireStoreDetailObject,
            });
        }
    }
}