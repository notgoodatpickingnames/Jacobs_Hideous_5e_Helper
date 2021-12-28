import { makeStyles } from '@mui/styles';
import React, { ReactNode } from 'react';

import { theme } from '../../../Utils/theme/theme';

const useStyles = makeStyles(() => ({
    iconButton: {
        color: 'white',
        width: 'max-content',

        '& :hover': {
            color: theme.lightBlue,
        }
    }
}));

interface IconButtonProps {
    icon: ReactNode;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function IconButton({icon, onClick}: IconButtonProps) {
    const classes = useStyles();
    
    return (
        <div className={classes.iconButton} onClick={onClick}>
            {icon}
        </div>
    );
}