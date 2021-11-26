import { makeStyles } from '@mui/styles';

import { Card } from '../Card';
import { Game as GameModel } from './models/game';

const useStyles = makeStyles(() => ({
    gameContainer: {
        height: '160px',
        width: '150px',
        padding: '12px',
    }
}));

interface GameProps {
    game: GameModel;
}

export function Game({game}: GameProps) {
    const classes = useStyles();

    return (
        <Card>
            <div className={classes.gameContainer}>
                {game.name}
            </div>
        </Card>
    );
}