import { makeStyles } from '@mui/styles';
import { height } from '@mui/system';

import { theme } from '../../Utils/theme/theme';
import { Game as GameModel } from './models/game';

const useStyles = makeStyles(() => ({
    gameContainer: {
        border: `solid 2px ${theme.blue}`,
        height: '100%',
        width: '200px',
        marginRight: '12px',
        padding: '12px',
    }
}));

interface GameProps {
    game: GameModel;
}

export function Game({game}: GameProps) {
    const classes = useStyles();

    return (
        <div className={classes.gameContainer}>
            {game.name}
        </div>
    );
}