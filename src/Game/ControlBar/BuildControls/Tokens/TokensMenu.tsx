import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { useEngineContext } from '../../../../Utils/engine';
import { useInputContext } from '../../../../Utils/engine/input/input.context';
import { Vector2 } from '../../../../Utils/engine/models/Vector2';
import { useWorldContext } from '../../../../Utils/engine/world/world.context';
import { useGameManagerContext } from '../../../gameManager';
import { ImageObject } from '../../../gameObjectTypes/ImageObject';
import { MouseFollowImage } from '../../../MouseFollowImage/MouseFollowImage';
import { useMouseFollowImage } from '../../../MouseFollowImage/useMouseFollowImage';
import { ImageDropZone } from '../Images';

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

export function TokensMenu() {
    const classes = useStyles();

    const {gameId} = useParams();
    
    const {addGameObject} = useEngineContext();
    const {createGameObject} = useGameManagerContext();
    const {scale} = useWorldContext();
    const {gridPositionMouseIsOver, mousePositionInWorld} = useInputContext();
    const {assets} = useGameManagerContext();
    const {tokenBeingDragged, onDragStart} = useMouseFollowImage(onDragEnd);

    const tokens = useMemo(() => {
        return Boolean(assets) ? assets.map((asset) =>  new ImageObject(uuid(), Vector2.zero, 40, 40, asset.image, asset.assetId, asset.name)) : [];
    }, [assets]);

    function onDragEnd(event: MouseEvent, token: ImageObject) {
        if (Boolean(tokenBeingDragged)) {
            let gameObject;
            
            if (event.shiftKey) {
                gameObject = token.clone(uuid(), gridPositionMouseIsOver.current);
            } else {
                gameObject = token.clone(uuid(), mousePositionInWorld.current);
            }
            
            addGameObject(gameObject);
            createGameObject(gameObject);
        }
    }

    return (
        <>
            <ImageDropZone imageStoragePath={`${gameId}`}>
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
            </ImageDropZone>

            {
                Boolean(tokenBeingDragged) && <MouseFollowImage source={tokenBeingDragged.image.src} width={tokenBeingDragged.width * scale.current} height={tokenBeingDragged.height * scale.current} />
            }
        </>
    );
}