import { makeStyles } from '@mui/styles';

import { useGames } from './useGames';

const useStyles = makeStyles(() => ({
    container: {
        width: 'calc(100vw - 200px)',
        height: '200px'
    }
}));

export function Games() {
    const classes = useStyles();
    const games = useGames();

    return (
        <div className={classes.container}>
            Games

            <div>
                {
                    games.map((game) =>
                        <div>
                            {game.name}
                        </div>
                    )
                }
            </div>
        </div>
    );
}