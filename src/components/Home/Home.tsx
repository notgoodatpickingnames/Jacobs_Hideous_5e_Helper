import { makeStyles } from '@mui/styles';

import { Games } from '../Games/Games';
import { Menu } from '../Menus';

const useStyles = makeStyles(() => ({
    home: {
        display: 'flex',
        justifyContent: 'center',
        height: `calc(100vh - 48px)`,
        width: `calc(100vw - 48px)`,
        padding: '24px',
        color: 'white',
    },

    gamesContainer: {

    }
}));

export function Home() {
    const classes = useStyles();

    return (
        <div className={classes.home}>
            <div>
                <Menu>
                    <Games />
                </Menu>
            </div>
        </div>
    )
}