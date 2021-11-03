import { makeStyles } from '@mui/styles';

import { Vector2 } from '../../../../Utils/engine/Vector2';
import { Token } from '../../../models/Token';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
}));

const juniperIconPath = './images/Juni.png'
const juniperImage = new Image();
juniperImage.src = juniperIconPath;

const tokens = [
    new Token(Vector2.zero, 40, 40, juniperImage, 'Juniper'),
]

export function TokensMenu() {
    const classes = useStyles();

    function onDragStart(event: any) {
        console.log('DRAG ENTER', event, event.layerX, event.target);
    }

    return (
        <div className={classes.tokensMenuContainer}>
            {
                tokens.map((token, index) => 
                    <div className={classes.tokenContainer} key={`token_${index}`}>
                        <img height={80} width={80} draggable='true' onDragStart={onDragStart} alt='token' src={token.image.src} />
                        <span>{token.name}</span>
                    </div>
                )
            }
        </div>
    );
}