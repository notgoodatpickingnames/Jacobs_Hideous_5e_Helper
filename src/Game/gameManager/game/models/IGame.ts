import { Timestamp } from '@firebase/firestore';

export interface IGame {
    gameId: string;
    ownerId: string;
    players: string[];
    name: string;
    modifiedOn: Timestamp;
}