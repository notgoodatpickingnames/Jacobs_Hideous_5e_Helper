import { IGame } from './IGame';

export class Game {
    public ownerId: string;
    public players: string[];
    public name: string;

    constructor(game: IGame) {
        this.ownerId = game.ownerId;
        this.players = game.players;
        this.name = game.name;
    }
}