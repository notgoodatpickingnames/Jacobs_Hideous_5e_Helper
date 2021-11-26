import { makeStyles } from '@mui/styles';

import { WithFlicker } from '../../Utils/effects';
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
        height: '160px',
    },

    existingGames: {
        display: 'flex',
        maxWidth: 'calc(100vw - 200px - 160px)',
    },

    game: {
        marginRight: '12px',
    },
}));

export function Games() {
    const classes = useStyles();
    const {games} = useGames();

    return (
        <div className={classes.container}>
            <div className={classes.games}>
                <div className={classes.existingGames}>
                    {
                        games.map((game, index) =>
                            <div key={`game_${index}`} className={classes.game}>
                                <WithFlicker delay={index * 300} length={1000}>
                                    <Game game={game}/>
                                </WithFlicker>
                            </div>
                        )
                    }
                </div>

                <div style={{transition: 'all .5s'}}>
                    <NewGame />
                </div>
            </div>
        </div>
    );
}