import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from '../../../../components/Card';
import { useEngineContext } from '../../../../Utils/engine';
import { useAssetManagerContext } from '../../../../Utils/engine/assetManager/assetManager.context';
import { useInputContext } from '../../../../Utils/engine/input/input.context';
import { Vector2 } from '../../../../Utils/engine/models/Vector2';
import { useWorldContext } from '../../../../Utils/engine/world/world.context';
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
    const {scale} = useWorldContext();
    const {gridPositionMouseIsOver, mousePositionInWorld} = useInputContext();
    const {assets} = useAssetManagerContext();
    const {tokenBeingDragged, onDragStart} = useMouseFollowImage(onDragEnd);

    const tokens = useMemo(() => {
        return Boolean(assets) ? assets.map((asset) =>  new ImageObject(Vector2.zero, 40, 40, asset.image, asset.name)) : [];
    }, [assets]);

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
            <ImageDropZone imageStoragePath={`${gameId}`}>
                <Card>
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
                </Card>
            </ImageDropZone>

            {
                Boolean(tokenBeingDragged) && <MouseFollowImage source={tokenBeingDragged.image.src} width={tokenBeingDragged.width * scale.current} height={tokenBeingDragged.height * scale.current} />
            }
        </>
    );
}