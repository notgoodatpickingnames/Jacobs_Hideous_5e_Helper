import { makeStyles } from '@mui/styles';

import { Game } from './Game';
import { useGames } from './useGames';

const useStyles = makeStyles(() => ({
    container: {
        width: 'calc(100vw - 200px)',
        height: '200px'
    },

    games: {
        height: 'calc(100% - 17px)',
    },
}));

export function Games() {
    const classes = useStyles();
    const games = useGames();

    return (
        <div className={classes.container}>
            Games

            <div className={classes.games}>
                {
                    games.map((game) =>
                        <Game game={game}/>
                    )
                }

                <div>

                </div>
            </div>
        </div>
    );
}