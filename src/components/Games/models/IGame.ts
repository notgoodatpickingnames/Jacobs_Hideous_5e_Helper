import { Timestamp } from '@firebase/firestore';

export interface IGame {
    ownerId: string;
    players: string[];
    name: string;
    modifiedOn: Timestamp;
}