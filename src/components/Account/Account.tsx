import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, ClickAwayListener } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

import { useAuth } from '../../Utils/auth/auth.context';

const useStyles = makeStyles(() => ({
    accountButton: {
        cursor: 'pointer',
        position: 'absolute',
        zIndex: 100,
    },

    menu: {
        height: '150px',
        width: '150px',
        top: '0px',
        left: '-200px',
        position: 'fixed',
        zIndex: 99,
        transition: 'all .5s',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '12px',
    },

    open: {
        left: '0px',
    },

    logOutButton: {
        height: 'min-content'
    }
}));

export function Account() {
    const classes = useStyles();

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const {logOut} = useAuth();

    return (
        <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
            <div>
                <AccountCircleIcon onClick={() => setMenuOpen(!menuOpen)} className={classes.accountButton} fontSize={'large'} />

                <div className={`${classes.menu} ${menuOpen && classes.open}`}>
                    <Button className={classes.logOutButton} onClick={logOut}>Log Out</Button>
                </div>
            </div>
        </ClickAwayListener>
    );
}