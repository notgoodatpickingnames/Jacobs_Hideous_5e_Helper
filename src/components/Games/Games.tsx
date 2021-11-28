import { makeStyles } from '@mui/styles';

import { Game } from './Game';
import { NewGame } from './NewGame';
import { useGames } from './useGames';

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

    return (
        <div className={classes.games}>
            <div className={classes.newGame}>
                <NewGame />
            </div>

            <div className={classes.existingGames}>
                {
                    games.map((game, index) =>
                        <div key={`game_${index}`} className={classes.game}>
                            <Game game={game} index={index} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}