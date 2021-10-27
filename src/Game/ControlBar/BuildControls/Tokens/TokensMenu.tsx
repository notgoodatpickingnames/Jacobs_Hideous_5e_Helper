import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    tokensMenuContainer: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '300px',
        height: '50vh',
        backgroundColor: 'white',
    },

    tokenContainer: {

    }
}));

const tokens = [
    './images/Juni.png'
]

export function TokensMenu() {
    const classes = useStyles();


    return (
        <div className={classes.tokensMenuContainer}>
            {tokens.map((token, index) => <img alt='token' key={`token_${index}`} src={token}/>)}
        </div>
    );
}