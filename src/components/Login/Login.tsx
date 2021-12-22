import { makeStyles } from '@mui/styles';
import React from 'react';

import { useAuth } from '../../Utils/auth/auth.context';
import { theme } from '../../Utils/theme/theme';
import { PrimaryButton, ScrollingText } from '../Controls';
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
        textAlign: 'center',
    },

    text: {
        marginBottom: '12px',
    },

    loginButton: {
        backgroundColor: theme.lightPurple,
        color: 'white',
    }
}));

export function Login() {
    const classes = useStyles();
    const { signInWithGoogle } = useAuth();

    return (
        <div className={classes.container}>
            <Menu>
                <div className={classes.loginOptions}>
                    <div className={classes.text}>
                        <ScrollingText timeBetweenLetters={50} text={['Unknown User Detected', 'Enter Credentials']} />
                    </div>

                    <PrimaryButton className={classes.loginButton} onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</PrimaryButton>
                </div>
            </Menu>
        </div>
    );
}