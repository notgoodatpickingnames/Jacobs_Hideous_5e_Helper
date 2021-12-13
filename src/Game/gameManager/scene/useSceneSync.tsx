import { useEffect } from 'react';

import { useAuth } from '../../../Utils/auth/auth.context';
import { Asset } from '../assets/models/asset';
import { useCurrentSceneId } from './hooks/useCurrentSceneId';
import { useGameObjects } from './hooks/useGameObjects';

export function useSceneSync(gameId: string, assets: Asset[]) {
    const { user } = useAuth();
    const userId = user.uid;

    const currentSceneId = useCurrentSceneId(userId, gameId);
    const {gameObjects, createGameObject} = useGameObjects(gameId, currentSceneId, assets);

    return {gameObjects, createGameObject} as const;
}