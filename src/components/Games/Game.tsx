import { makeStyles } from '@mui/styles';

import { WithFlicker } from '../../Utils/effects';
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
    index: number;
}

export function Game({game, index}: GameProps) {
    const classes = useStyles();


    return (
        <Card flickerSettings={{length: 1000, delay: index * 300, randomFlickers: true}}>
            <WithFlicker delay={index * 300} length={1000} randomFlicker={true}>
                <div className={classes.gameContainer}>
                    {game.name}
                </div>
            </WithFlicker>
        </Card>
    );
}