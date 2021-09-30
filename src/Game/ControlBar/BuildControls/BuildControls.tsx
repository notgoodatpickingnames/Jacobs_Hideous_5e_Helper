import MapIcon from '@mui/icons-material/Map';
import { Button as ButtonBase } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { useState } from 'react';

const buttonStyles = () => ({
    root: {
        color: 'black',
    },
});

const Button = withStyles(buttonStyles)(ButtonBase);

const useStyles = makeStyles(({
    container: {
        position: 'relative',
    },

    popUp: {
        position: 'absolute',
        bottom: '36px',
        backgroundColor: '#5c58b6',
        border: '1px solid black',
        borderRadius: '2px',
        padding: '12px'
    },

    icon: {
        // color: '#b957ce',
        color: '#F3E600',
    },

    menuItem: {
        color: '#F3E600',
        width: 'max-content',
    }
}));

function BuildControls() {
    const classes = useStyles();

    const [open, setOpen] = useState<boolean>(false);

    function onRootClick() {
        setOpen(!open);
    }

    return (
        <div className={classes.container}>
            <Button onClick={onRootClick}>
                <MapIcon className={classes.icon} />
            </Button>

            <div hidden={!open} className={classes.popUp}>
                <div className={classes.menuItem}>
                    Test 1
                </div>
                
                <div>
                    Test 2
                </div>

                <div>
                    Test 3
                </div>
                
                <div>
                    Test 4
                </div>
            </div>
        </div>
    )
}

export default BuildControls;