import { makeStyles } from '@mui/styles';

import { Account } from '../Account/Account';
import { Games } from '../Games/Games';
import { Friends } from './Friends';

const useStyles = makeStyles(() => ({
    home: {
        display: 'flex',
        justifyContent: 'center',
        height: `calc(100vh - 48px)`,
        width: `calc(100vw - 48px)`,
        padding: '24px',
        color: 'white',
    },

    accountContainer: {
        position: 'absolute',
        top: '12px',
        left: '12px',
    },

    gamesContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },

    friendsContainer: {
        marginRight: '60px',
    },

    title: {
        textAlign: 'center',
        width: '100%',
        marginBottom: '10px',
    },
}));

export function Home() {
    const classes = useStyles();

    return (
        <div className={classes.home}>
            <div className={classes.gamesContainer}>
                <div>
                    <div className={classes.title}>
                        G A M E S
                    </div>

                    <Games />
                </div>
            </div>

            <div className={classes.friendsContainer}>
                <div>
                    <div className={classes.title}>
                        F R I E N D S
                    </div>

                    <Friends />
                </div>
            </div>

            <div className={classes.accountContainer}>
                <Account />
            </div>
        </div>
    )
}