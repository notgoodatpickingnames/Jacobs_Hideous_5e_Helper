import { makeStyles } from '@mui/styles';
import { height } from '@mui/system';

import { theme } from '../../Utils/theme/theme';
import { Game as GameModel } from './models/game';

const useStyles = makeStyles(() => ({
    gameContainer: {
        border: `solid 2px ${theme.blue}`,
        height: '100%',
        width: '200px',
        marginRight: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    plus: {
        position: 'relative',
        cursor: 'pointer',

        '& :hover': {
            backgroundColor: 'grey',
        },

        '&:before': {
            content: "' '",
            position: 'absolute',
            marginLeft: '-35px',
            width: '80px',
            borderTop: '10px solid',
        },

        '&:after': {
            content: "' '",
            position: 'absolute',
            marginTop: '-35px',
            height: '80px',
            borderLeft: '10px solid',
        },
    }
}));

export function NewGame() {
    const classes = useStyles();

    return (
        <div className={classes.gameContainer}>
            <div className={classes.plus}>

            </div>
        </div>
    );
}