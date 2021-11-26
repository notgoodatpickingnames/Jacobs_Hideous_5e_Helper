import { makeStyles } from '@mui/styles';

import { Account } from '../Account/Account';
import { Games } from '../Games/Games';

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
    }
}));

export function Home() {
    const classes = useStyles();

    return (
        <div className={classes.home}>
            <Games />

            <div className={classes.accountContainer}>
                <Account />
            </div>
        </div>
    )
}