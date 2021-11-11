import { makeStyles } from '@mui/styles';
import React from 'react';

import { MouseFollowImage } from '../../../../MouseFollowImage/MouseFollowImage';
import { useMouseFollowImage } from '../../../../MouseFollowImage/useMouseFollowImage';
import { useEngineContext } from '../../../../Utils/engine';
import { Vector2 } from '../../../../Utils/engine/Vector2';
import { useWorldContext } from '../../../../Utils/engine/world.context';
import { ImageObject } from '../../../models/ImageObject';

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
    new ImageObject(Vector2.zero, 40, 40, juniperImage, 'Juniper'),
]

export function TokensMenu() {
    const classes = useStyles();
    
    const {addGameObject} = useEngineContext();
    const {gridPositionMouseIsOver, mousePositionInWorld, scale} = useWorldContext();
    const {tokenBeingDragged, onDragStart} = useMouseFollowImage(onDragEnd);

    function onDragEnd(event: MouseEvent, token: ImageObject) {
        if (Boolean(tokenBeingDragged)) {
            let gameObject;
            
            if (event.shiftKey) {
                gameObject = token.clone(gridPositionMouseIsOver.current);
            } else {
                gameObject = token.clone(mousePositionInWorld.current);
            }
            
            addGameObject(gameObject);
        }
    }

    return (
        <>
            <div className={classes.tokensMenuContainer}>
                {
                    tokens.map((token, index) => 
                        <div className={classes.tokenContainer} key={`token_${index}`}>
                            <img height={80} width={80} draggable='true' onDragStart={(event) => onDragStart(event, token)} alt='token' src={token.image.src}/>
                            <span>{token.name}</span>
                        </div>
                    )
                }
            </div>

            {
                Boolean(tokenBeingDragged) && <MouseFollowImage source={tokenBeingDragged.image.src} width={tokenBeingDragged.width * scale.current} height={tokenBeingDragged.height * scale.current} />
            }
        </>
    );
}