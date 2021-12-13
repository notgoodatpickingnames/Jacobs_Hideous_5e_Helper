import { useEffect } from 'react';

import { useAuth } from '../../../Utils/auth/auth.context';
import { useCurrentSceneId } from './hooks/useCurrentSceneId';
import { useGamesGameObjects } from './hooks/useGamesGameObjects';
import { useScenesGameObjects } from './hooks/useScenesGameObjects';

export function useSceneSync(gameId: string) {
    const { user } = useAuth();
    const userId = user.uid;

    const currentSceneId = useCurrentSceneId(userId, gameId);
    useGamesGameObjects(gameId);
    useScenesGameObjects(gameId, currentSceneId);

    useEffect(() => {
        console.log('Current Scene Id', currentSceneId);
    }, [currentSceneId]);
}