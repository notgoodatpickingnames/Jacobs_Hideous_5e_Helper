import { IPlayer } from './IPlayer';

export class Player {
    public playerId: string;
    public name: string;

    constructor(player: IPlayer) {
        this.playerId = player.playerId;
        this.name = player.name;
    }
}