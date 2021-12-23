import { Route } from '../routing/route';
import { EngineProvider } from '../Utils/engine/Engine';
import { FriendsProvider } from '../Utils/profile/friends/friends.context';
import { Game } from './Game';

export const gameRoutes: Route[] = [
    {
        path: '/game/:gameId',
        component:
            <FriendsProvider>
                <EngineProvider>
                    <Game />
                </EngineProvider>
            </FriendsProvider>
    }
]