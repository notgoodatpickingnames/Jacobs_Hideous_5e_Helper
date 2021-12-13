import { collection, doc, getFirestore, onSnapshot, setDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { GameObject } from '../../../../Utils/engine';
import { GameObjectTypes } from '../gameObjectTypes';

export function useGamesGameObjects(gameId: string) {
    const [gameObjects, setGameObjects] = useState<(any)[]>();

    useEffect(() => {
        if (Boolean(gameId)) {
            const db = getFirestore();
            console.log('GETTING GAME OBJECTS', gameId);

            const unsub = onSnapshot(collection(db, `gameObjects/${gameId}/gameObjects`), ({docs}) => {
                console.log('GOT GAME OBJECTS', docs);
                const gameObjects = docs.map((doc) => {
                    const docData = doc.data();
                    const gameObjectType = docData.type as GameObjectTypes;

                    switch(gameObjectType) {
                        // case GameObjectTypes.token: return new ImageObject()
                    }

                    return [];
                });
            });

            return () => {unsub()};
        }
    }, [gameId]);

    function createGameObject(gameObject: GameObject) {
        const db = getFirestore();
        
        setDoc(doc(db, `gameObjects/${gameId}/gameObjects`, uuid()), {
            name: 'test',
        });
    }
}