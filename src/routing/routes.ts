import { homeRoutes } from '../components/Home/home.routes';
import { gameRoutes } from '../Game/game.routes';
import { Route } from './route';

export const routes: Route[] = [
    ...homeRoutes,
    ...gameRoutes,
];