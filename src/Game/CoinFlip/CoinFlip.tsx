import { Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

import { CoinState } from './coin.states';

const useStyles = makeStyles(() => ({
    coinFlipContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },

    result: {
        marginTop: '20px',
        marginBottom: '20px',
    },
}));

const borkedImageSrc = './images/Coins/Borked.jpg';
const headsImageSrc = './images/Coins/Heads.jpg';
const tailsImageSrc = './images/Coins/Tails.jpg';
const sideImageSrc = './images/Coins/Side.jpg';

export function CoinFlip() {
    const classes = useStyles();

    const [coinState, setCoinState] = useState<CoinState>(CoinState.Heads);
    const [coinImageSrc, setCoinImageSrc] = useState<string>(headsImageSrc);
    const [isFlipping, setIsFlipping] = useState<boolean>(false);

    function flipCoin(): void {
        setIsFlipping(true);
        const state = Math.floor(Math.random() * 4);

        switch(state) {
            case 0: setCoinState(CoinState.Borked);
                setCoinImageSrc(borkedImageSrc);
                break;
            case 1: setCoinState(CoinState.Heads);
                setCoinImageSrc(headsImageSrc);
                break;
            case 2: setCoinState(CoinState.Tails);
                setCoinImageSrc(tailsImageSrc);
                break;
            case 3: setCoinState(CoinState.Side);
                setCoinImageSrc(sideImageSrc);
                break;
            default: setCoinState(CoinState.Borked);
                setCoinImageSrc(borkedImageSrc);
                break;
        }

        setTimeout(() => {
            setIsFlipping(false);
        }, 10000);
    }

    return (
        <div className={classes.coinFlipContainer}>
            <Button onClick={flipCoin}>F L I P</Button>

            {
                isFlipping && <CircularProgress style={{width: '200px', height: '200px', marginTop: '20px'}} />
            }

            {
                !isFlipping &&
                    <>
                        <div className={classes.result}>
                                <img src={coinImageSrc} width='200' height='200'/>
                        </div>
                        
                        {coinState}
                    </>
            }
            
        </div>
    );
}