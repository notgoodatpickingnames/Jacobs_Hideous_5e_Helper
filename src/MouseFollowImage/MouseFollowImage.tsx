import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

import { useWorldContext } from '../Game/context/world.context';
import { Vector2 } from '../Utils/engine/Vector2';
import useEventListener from '../Utils/hooks/useEventListener';

const useStyles = makeStyles(() => ({
    imageContainer: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0',
    },

    image: {
        position: 'absolute',
    }
}));

interface MouseFollowImageProps {
    source: string;
    width: number;
    height: number;
    snapToGrid?: boolean;
}

export function MouseFollowImage({source, width, height, snapToGrid = false}: MouseFollowImageProps) {
    const classes = useStyles();

    const {gridPositionMouseIsOver, getPositionInScreenSpace} = useWorldContext();

    const [position, setPosition] = useState<Vector2>(Vector2.zero);

    function onMouseMove(event: MouseEvent): void {
        let x = 0;
        let y = 0;

        if (snapToGrid) {
            const mousePosInGrid = gridPositionMouseIsOver.current;
            const positionOnGridInScreenSpace = getPositionInScreenSpace(mousePosInGrid);

            x = positionOnGridInScreenSpace.x;
            y = positionOnGridInScreenSpace.y;
        } else {
            const {clientX, clientY} = event;

            x = clientX;
            y = clientY;
        }

        setPosition(new Vector2(x - (width / 2), y - (height / 2)));
    }

    useEventListener('mousemove', (event: Event) => onMouseMove(event as MouseEvent));

    return (
        <div className={classes.imageContainer}>
            <img alt={'Should follow mouse'} className={classes.image} src={source} width={width} height={height} style={{top: position.y, left: position.x}} />
        </div>
    );
}