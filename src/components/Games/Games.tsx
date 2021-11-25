import { makeStyles } from '@mui/styles';

import { Game } from './Game';
import { NewGame } from './NewGame';
import { useGames } from './useGames';

const useStyles = makeStyles(() => ({
    container: {
        width: 'calc(100vw - 200px)',
        height: '200px'
    },

    games: {
        display: 'flex',
        height: 'calc(100% - 64px)',
        paddingTop: '12px',
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
                    games.map((game, index) =>
                        <div key={`game_${index}`}>
                            <Game game={game}/>
                        </div>
                    )
                }

                <div>
                    <NewGame />
                </div>
            </div>
        </div>
    );
}