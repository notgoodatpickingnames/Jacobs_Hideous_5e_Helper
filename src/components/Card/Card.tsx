import { makeStyles } from '@mui/styles';
import React, { ReactNode, useEffect, useState } from 'react';

import { WithFlicker } from '../../Utils/effects';
import { useIsMounted } from '../../Utils/hooks/useIsMounted';
import { theme } from '../../Utils/theme/theme';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        width: 'max-content',
        
        '&:hover': {
            background: 'linear-gradient(0deg, rgba(0, 231, 252, 0.1) 50%, rgba(17, 17, 17, 0) 100%)',
        },
    },

    card: {
        display: 'block',
        background: 'linear-gradient(0deg, rgba(0, 231, 252, 0.1) 0%, rgba(17, 17, 17, 0) 100%)',
        border: `1px ${theme.lightBlue} solid`,
        borderRadius: '5px',
        boxSizing: 'border-box',
        clipPath: 'polygon(calc(100% - 45px) 0, 100% 45px, 100% 100%, 0 100%, 0 0)',
        minHeight: '50px',

        

        '&:before': {
            display: 'block',
            content: "' '",
            position: 'absolute',
            top: '0',
            right: '0',
            borderLeft: `47px solid transparent`,
            borderTop: `47px solid ${theme.lightBlue}`,
        },
    },

    triangle: {
        position: 'absolute',
        top: '0',
        right: '0',
        height: '40px',
        width: '40px',

        '&:before': {
            display: 'block',
            content: "' '",
            position: 'absolute',
            top: '0',
            right: '0',
            borderLeft: `40px solid transparent`,
            borderTop: `40px solid ${theme.yellow}`,
        },
    }
}));

interface FlickerSettings {
    delay: number;
    length: number;
    randomFlickers: boolean;
}

interface CardProps {
    children?: ReactNode | ReactNode[];
    flickerSettings?: FlickerSettings;
}

export function Card({children, flickerSettings}: CardProps) {
    const classes = useStyles();

    const [cardVisible, setCardVisible] = useState<boolean>(false);
    const isMounted = useIsMounted();

    useEffect(() => {
        if (Boolean(flickerSettings)) {
            setTimeout(() => {
                if (isMounted.current) {
                    setCardVisible(true);
                }
            }, flickerSettings.delay);
        } else {
            setCardVisible(true);
        }
    }, [flickerSettings, isMounted]);

    const card = 
        <div className={`${classes.card}`}>
            {children}
        </div>;

    return (
        <div className={classes.container}>
            {
                Boolean(flickerSettings) ?
                    <WithFlicker delay={flickerSettings.delay} length={flickerSettings.length} randomFlicker={flickerSettings.randomFlickers}>
                        {card}
                    </WithFlicker> :
                    <>
                        {card}
                    </>
            }
            

            <div className={classes.triangle} style={{display: `${cardVisible ? 'block' : 'none'}`}}>
            </div>
        </div>
    );
}