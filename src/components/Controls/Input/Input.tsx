import { InputClassKey, TextField as TextFieldBase, TextFieldClassKey, TextFieldProps } from '@mui/material';
import { makeStyles, Styles, withStyles } from '@mui/styles';
import { color } from '@mui/system';
import React from 'react';

const styles = () => ({
    root: {
        color: 'white',
        
        '& .MuiOutlinedInput-input': {

        },

        '& .MuiInputLabel-outlined': {

        },

        '& .MuiInput-root': {
            color: 'white',
        },

        '& .MuiInput-underline': {
            color: 'white',
            
            '&:before': {
                borderBottom: '2px solid white !important',
            },

            '&:after': {
                borderBottom: '2px solid white !important',
            },
        },

        '& .MuiInputLabel-root': {
            color: 'white !important',
        }
    },
});

const TextField = withStyles(styles)(TextFieldBase);

const useStyles = makeStyles(() => ({
    underline: {
        "&&&:before": {
             borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    }
}));

export function Input(props: TextFieldProps) {
    const classes = useStyles();

    return (
        <TextField
            {...props}
            inputProps={{
                ...props.inputProps,
                classes
            }}
            variant={'standard'}
        />
    )
}