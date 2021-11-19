import { makeStyles } from '@mui/styles';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import useElementSize from '../../Utils/hooks/useElementSize';
import { theme } from '../../Utils/theme/theme';

const openAnimationTime = 2000;

const useStyles = makeStyles(() => ({
    container: {
        height: '0px',
        width: '0px',
        
        backgroundColor: 'yellow',
        position: 'relative',
        transition: `all ${openAnimationTime}ms`,

        padding: '20px 50px 20px 50px',

        '&:before': {
            display: 'block',
            content: "' '",
            position: 'absolute',
            top: '0',
            right: '0',
            borderTop: `20px solid ${theme.background}`,
            borderLeft: `50px solid yellow`,
            width: '0px',
        },

        '&:after': {
            display: 'block',
            content: "' '",
            position: 'absolute',
            bottom: '0',
            left: '0',
            borderTop: `20px solid yellow`,
            borderLeft: `50px solid ${theme.background}`,
            width: '0px',
        }
    },

    open: {

    },

    contents: {
        opacity: 0,
        transition: `all ${openAnimationTime}ms`,
    },

    border: {

    },
}));

interface MenuProps {
    children?: ReactNode | ReactNode[];
    // width: number;
    // height: number;
}

export function Menu({children}: MenuProps) {
    const classes = useStyles();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const contentsContainerRef = useRef<HTMLDivElement>();
    const contentsContainerSize = useElementSize(contentsContainerRef);

    const [_children, setChildren] = useState<ReactNode | ReactNode[]>();

    useEffect(() => {
        setTimeout(() => {
            setChildren(children);
        }, 10);
    }, [children]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, openAnimationTime);
    }, [_children]);

    useEffect(() => {
        console.log('The Size Changed', contentsContainerSize);
    }, [contentsContainerSize]);

    return (
        <>
            <div className={classes.container}>
                <div className={classes.contents}>
                    {children}
                </div>
            </div>

            <div style={{opacity: 0, position: 'absolute'}} ref={contentsContainerRef}>
                {children}
            </div>
        </>
    );
}