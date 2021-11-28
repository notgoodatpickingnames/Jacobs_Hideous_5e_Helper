import { Route } from '../routing/route';
import { EngineProvider } from '../Utils/engine/Engine';
import { Game } from './Game';

export const gameRoutes: Route[] = [
    {
        path: '/game/:gameId',
        component:
            <EngineProvider>
                <Game />
            </EngineProvider>
    }
]