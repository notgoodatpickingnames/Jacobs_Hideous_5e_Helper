import { makeStyles, withStyles } from '@mui/styles';
import React, { ReactNode, useEffect, useState } from 'react';

import { useIsMounted } from '../hooks/useIsMounted';

const useStyles = makeStyles(() => ({
    '@keyframes flicker': {
        from: {
            opacity: 1,
        },

        to: {
            opacity: 0,
        },
    },

    flicker: {
        animationName: '$flicker',
        animationDuration: '50ms',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
        animationTimingFunction: 'ease-in-out',
    },

    flickerDone: {
        opacity: `1 !important`,
    },

    withAnimation: ({ flickering }: { flickering: boolean }) => ({
        animationPlayState: !flickering ? 'paused' : 'running',
    }),
}));

const styles = () => ({
    container: {},

    hidden: {
        display: 'none',
    },

    visible: {
        display: 'block',
    },
});

interface WithFlickerProps {
    children: ReactNode | ReactNode[];
    delay: number;
    length: number;
    classes: {hidden: any, visible: any, container: any};
    randomFlicker?: boolean;
}

function StyledWithFlicker({children, delay, length, classes, randomFlicker = false}: WithFlickerProps) {
    const [visible, setVisible] = useState<boolean>(false);
    const [flickering, setFlickering] = useState<boolean>(false);
    const [loadFlickerDone, setLoadFlickerDone] = useState<boolean>(false);
    const [randomFlickerFiring, setRandomFlickerFiring] = useState<boolean>(false);
    const isMounted = useIsMounted();

    const { flicker, withAnimation, flickerDone } = useStyles({ flickering });

    useEffect(() => {
        if (randomFlicker) {
            if (randomFlickerFiring) {
                setTimeout(() => {
                    if (isMounted.current) {
                        setFlickering(false);
                        setRandomFlickerFiring(false);
                    }
                }, (Math.floor(Math.random() * 10) + 1) * 50);
            } else {
                setTimeout(() => {
                    if (isMounted.current) {
                        setFlickering(true);
                        setRandomFlickerFiring(true);
                    }
                }, Math.floor(Math.random() * 10000) + 2000);
            }
        }
    }, [randomFlickerFiring, randomFlicker, isMounted]);

    useEffect(() => {
        if (loadFlickerDone && randomFlicker) {
            setTimeout(() => {
                if (isMounted.current) {
                    setFlickering(true);
                    setRandomFlickerFiring(true);
                }
            }, Math.floor(Math.random() * 10000) + 2000);
        }
    }, [loadFlickerDone, randomFlicker, isMounted]);

    useEffect(() => {
        setTimeout(() => {
            if (isMounted.current) {
                setFlickering(true);
                setVisible(true);
                setTimeout(() => {
                    if (isMounted.current) {
                        setFlickering(false);
                        setLoadFlickerDone(true);
                    }
                }, length);
            }
        }, delay)
    }, [delay, length, isMounted]);

    return (
        <div className={`${flickering && flicker} ${withAnimation} ${visible ? classes.visible : classes.hidden} ${classes.container} ${loadFlickerDone && !flickering && flickerDone}`}>
            {children}
        </div>
    );
}

export const WithFlicker = withStyles(styles)(StyledWithFlicker);