import { IGame } from './IGame';

export class Game {
    public gameId: string;
    public ownerId: string;
    public players: string[];
    public name: string;
    public modifiedOn: Date;

    constructor(game: IGame) {
        this.gameId = game.gameId;
        this.ownerId = game.ownerId;
        this.players = game.players;
        this.name = game.name;
        this.modifiedOn = game.modifiedOn.toDate()
    }
}