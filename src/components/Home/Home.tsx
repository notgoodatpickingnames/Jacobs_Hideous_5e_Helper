import { makeStyles } from '@mui/styles';

import { Menu } from '../Menus/Menu';

const useStyles = makeStyles(() => ({
    home: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `calc(100vh - 48px)`,
        width: `calc(100vw - 48px)`,
        padding: '24px',
    }
}));

export function Home() {
    const classes = useStyles();

    return (
        <div className={classes.home}>
            <Menu>
                <div style={{color: 'black'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt <br />
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco <br />
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in <br /> <br /> <br /> <br /> <br /> <br /> <br />
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non <br />
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </Menu>
        </div>
    )
}