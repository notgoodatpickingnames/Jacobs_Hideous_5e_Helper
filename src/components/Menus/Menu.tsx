import { makeStyles } from '@mui/styles';
import React, { ReactNode } from 'react';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },

    menu: {
        background: 'linear-gradient(0deg, rgba(245, 213, 70, 0.1) 0%, rgba(17, 17, 17, 0) 100%)',
        border: '1px #f5d546 solid',
        borderRadius: '5px',
        padding: '24px',
        boxSizing: 'border-box',
    },

    title: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '5px',
        marginRight: '4px',
        width: '64px',

        '& span': {
            transform: 'rotate(-90deg)',
            height: 'min-content',
            color: 'white',
            letterSpacing: '6px',
            fontSize: '24px'
        },
    },
}));

interface MenuProps {
    children?: ReactNode | ReactNode[];
    title?: string;
}

export function Menu({children, title}: MenuProps) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <span>
                    {title}
                </span>
            </div>

            <div className={`${classes.menu}`}>
                {children}
            </div>
        </div>
    );
}