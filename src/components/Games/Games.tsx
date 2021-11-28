import { makeStyles } from '@mui/styles';
import { useEffect, useMemo, useState } from 'react';

import { Game } from './Game';
import { NewGame } from './NewGame';
import { useGames } from './useGames';

const gameLoadingGlitchEffectOffset = 300;
const gameLoadingGlitchEffectLength = 1000;

const useStyles = makeStyles(() => ({
    games: {
        display: 'flex',
    },

    existingGames: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vw - 200px - 160px)',
        transition: 'all .5s ease',
    },

    afterInitialLoad: {
        flexDirection: 'column-reverse',
        justifyContent: 'flex-end',
    },

    game: {
        marginBottom: '12px',
    },

    newGame: {
        marginRight: '12px',
    }
}));

export function Games() {
    const classes = useStyles();
    const { games } = useGames();
    const [initialLoadInDone, setInitialLoadInDone] = useState<boolean>(false);

    useEffect(() => {
        if (games.length > 0) {
            setTimeout(() => {
                setInitialLoadInDone(true);
            }, (games.length * gameLoadingGlitchEffectOffset) + gameLoadingGlitchEffectLength);
        }
    }, [games]);


    // This solves the problem and happens to have good timing. The actual value is not needed because we are just resorting the games... TODO - Make this not so disgusting.
    const sortedGames = useMemo(() => {
        if (initialLoadInDone) {
            games.sort((game1, game2) => game1.modifiedOn.getTime() - game2.modifiedOn.getTime());
        } else {
            return games;
        }
    }, [games, initialLoadInDone]);

    return (
        <div className={classes.games}>
            <div className={classes.newGame}>
                <NewGame />
            </div>

            <div className={`${classes.existingGames} ${initialLoadInDone && classes.afterInitialLoad}`}>
                {
                    games.map((game, index) =>
                        <div key={`game_${index}`} className={classes.game}>
                            <Game
                                game={game}
                                index={index}
                                delayVisibility={initialLoadInDone}
                                gameLoadingGlitchEffectOffset={gameLoadingGlitchEffectOffset}
                                gameLoadingGlitchEffectLength={gameLoadingGlitchEffectLength}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}