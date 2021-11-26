import { makeStyles } from '@mui/styles';
import React, { ReactNode } from 'react';


const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },

    card: {
        background: 'linear-gradient(0deg, rgba(245, 213, 70, 0.1) 0%, rgba(17, 17, 17, 0) 100%)',
        border: '1px #f5d546 solid',
        borderRadius: '5px',
        padding: '24px',
        boxSizing: 'border-box',
    },
}));

interface CardProps {
    children?: ReactNode | ReactNode[];
}

export function Card({children}: CardProps) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={`${classes.card}`}>
                {children}
            </div>
        </div>
    );
}