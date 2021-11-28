import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from '../Card';
import { Game as GameModel } from './models/game';

const useStyles = makeStyles(() => ({
    gameCardContainer: {
        cursor: 'pointer',
    },

    gameContainer: {
        height: '60px',
        width: '400px',
        padding: '12px',
    }
}));

interface GameProps {
    game: GameModel;
    index: number;
    gameLoadingGlitchEffectOffset: number;
    gameLoadingGlitchEffectLength: number;
    delayVisibility: boolean;
}

export function Game({game, index, delayVisibility, gameLoadingGlitchEffectLength, gameLoadingGlitchEffectOffset}: GameProps) {
    const classes = useStyles();
    const navigate = useNavigate();

    function onGameClick(): void {
        navigate(`/game/${game.gameId}`);
    }

    const delayTime = !delayVisibility ? index * gameLoadingGlitchEffectOffset : 0;

    return (
        <div className={classes.gameCardContainer} onClick={onGameClick}>
            <Card flickerSettings={{length: gameLoadingGlitchEffectLength, delay: delayTime, randomFlickers: true}}>
                <div className={classes.gameContainer}>
                    {game.name}
                </div>
            </Card>
        </div>
    );
}