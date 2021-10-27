import { makeStyles } from '@mui/styles';
import { ReactNode } from 'react';

const useStyles = makeStyles(({
    controlsContainer: {
        position: 'absolute',
        width: '100vw',
        height: '50px',
        bottom: '25px',
        backgroundColor: '#5c58b6',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: 'solid 2px #5994ce',
    }
}));

interface ControlBarProps {
    children: ReactNode[] | ReactNode;
}

function ControlBar({children}: ControlBarProps) {
    const classes = useStyles();

    return (
        <div className={classes.controlsContainer}>
            {children}
        </div>
    )
}

export default ControlBar;