import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

import { useAuth } from '../../Utils/auth/auth.context';
import { theme } from '../../Utils/theme/theme';
import { Menu } from '../Menus';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        height: '100vh',
    },

    loginOptions: {
        padding: '20px',
    },

    loginButton: {
        backgroundColor: theme.lightPurple,
        color: 'white',
    }
}));

export function Login() {
    const classes = useStyles();
    const {signInWithGoogle} = useAuth();

    return (
        <div className={classes.container}>
            <Menu>
                <div className={classes.loginOptions}>
                    Unknown User Detected <br />
                    Enter Credentials <br />

                    <div>
                        <Button className={classes.loginButton} onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
                    </div>
                </div>
            </Menu>
        </div>
    );
}