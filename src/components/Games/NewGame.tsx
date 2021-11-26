import { makeStyles } from '@mui/styles';

import { Card } from '../Card';

const useStyles = makeStyles(() => ({
    gameContainer: {
        height: '160px',
        width: '150px',
        marginRight: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
        cursor: 'pointer',

        '& :hover': {
            backgroundColor: 'grey',
        },
    },

    plus: {
        position: 'relative',

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
        <Card>
            <div className={classes.gameContainer}>
                <div className={classes.plus}>

                </div>
            </div>
        </Card>
    );
}