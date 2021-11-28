import { Button, ButtonProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactNode } from 'react';

import { theme } from '../../../Utils/theme/theme';

const useStyles = makeStyles(() => ({
    button: {
        border: `1px solid ${theme.lightBlue} !important`,
        color: 'white !important',
    }
}));

export function PrimaryButton(props: ButtonProps) {
    const classes = useStyles();

    return (
        <Button {...props} variant={'outlined'} className={classes.button} />
    )
}