import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, ClickAwayListener } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

import { useAuth } from '../../Utils/auth/auth.context';
import { DisplayName } from './DisplayName';

const useStyles = makeStyles(() => ({
    accountButton: {
        cursor: 'pointer',
        position: 'absolute',
        zIndex: 100,
    },

    menu: {
        paddingTop: '60px',
        height: '100vh',
        width: '220px',
        top: '0px',
        left: '-220px',
        position: 'fixed',
        zIndex: 99,
        transition: 'all .5s',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '12px',
    },

    menuItem: {
        marginBottom: '24px',
    },

    email: {
        color: 'white',
        fontSize: '10px',
    },

    open: {
        left: '0px',
    },

    logOutButton: {
        height: 'min-content'
    },
}));

export function Account() {
    const classes = useStyles();

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const { logOut, user } = useAuth();

    return (
        <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
            <div>
                <AccountCircleIcon onClick={() => setMenuOpen(!menuOpen)} className={classes.accountButton} fontSize={'large'} />
                
                <div className={`${classes.menu} ${menuOpen && classes.open}`}>
                    <div>
                        <DisplayName />
                    </div>

                    <div className={classes.menuItem}>
                        <span className={classes.email}>{user.email}</span>
                    </div>

                    <div>
                        <Button className={classes.logOutButton} onClick={logOut}>Log Out</Button>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    );
}