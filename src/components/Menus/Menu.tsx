import { makeStyles } from '@mui/styles';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { useElementSize } from '../../Utils/hooks/size';
import { Size } from '../../Utils/hooks/size/size';
import { useIsMounted } from '../../Utils/hooks/useIsMounted';
import { theme } from '../../Utils/theme/theme';

const openAnimationTime = 1000;
const opacityTime = 50;
const waitToOpenTime = 1000;

const useStyles = makeStyles(() => ({
    '@keyframes flicker': {
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0.7,
        },
      },
      flicker: {
        animationName: '$flicker',
        animationDuration: '1000ms',
        animationIterationCount: '10',
        animationDirection: 'alternate',
        animationTimingFunction: 'ease-in',
      },

    container: {
        height: '0px',
        width: '0px',
        
        backgroundColor: 'yellow',
        position: 'relative',
        transition: `all ${openAnimationTime}ms`,
        transitionTimingFunction: 'ease-in',

        padding: '10px',

        '&:before': {
            display: 'block',
            content: "' '",
            position: 'absolute',
            top: '0',
            right: '0',
            borderTop: `10px solid ${theme.background}`,
            borderLeft: `50px solid yellow`,
            width: '0px',
        },

        '&:after': {
            display: 'block',
            content: "' '",
            position: 'absolute',
            bottom: '0',
            left: '0',
            borderTop: `10px solid yellow`,
            borderLeft: `50px solid ${theme.background}`,
            width: '0px',
        }
    },

    open: {
        opacity: '1 !important',
    },

    contents: {
        opacity: 0,
        transition: `all ${opacityTime}ms`,
    },

    border: {
        width: 'calc(100% - 20px)',
        height: 'calc(100% - 20px)',
        backgroundColor: theme.background,
        position: 'relative',
        transition: `all ${openAnimationTime}ms`,
        transitionTimingFunction: 'ease-in',

        padding: '10px',

        '&:before': {
            display: 'block',
            content: "' '",
            position: 'absolute',
            top: '0',
            right: '0',
            borderTop: `10px solid yellow`,
            borderLeft: `50px solid transparent`,
            width: '0px',
        },

        '&:after': {
            display: 'block',
            content: "' '",
            position: 'absolute',
            bottom: '0',
            left: '0',
            borderTop: `10px solid transparent`,
            borderLeft: `50px solid yellow`,
            width: '0px',
        }
    },
}));

interface MenuProps {
    children?: ReactNode | ReactNode[];
    // width: number;
    // height: number;
}

export function Menu({children}: MenuProps) {
    const classes = useStyles();

    const isMounted = useIsMounted();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const contentsContainerRef = useRef<HTMLDivElement>();
    const contentsContainerSize = useElementSize(contentsContainerRef);

    const [containerSize, setContainerSize] = useState<Size>({width: 0, height: 0});


    useEffect(() => {
        setTimeout(() => {
            if (isMounted.current) {
                setIsLoaded(true);
            }
        }, openAnimationTime + waitToOpenTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    useEffect(() => {
        setTimeout(() => {
            if (isMounted.current) {
                setContainerSize(contentsContainerSize);
            }
        }, waitToOpenTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentsContainerSize]);

    return (
        <>
            <div className={classes.container} style={{height: `${containerSize.height + 20}px`, width: `${containerSize.width + 20}px`}}>
                <div className={classes.border}>
                    <div className={`${classes.contents} ${isLoaded && classes.open}`}>
                        {
                            isLoaded && <> {children} </>
                        }
                    </div>
                </div>
            </div>

            <div style={{opacity: 0, position: 'absolute'}} ref={contentsContainerRef}>
                {children}
            </div>
        </>
    );
}