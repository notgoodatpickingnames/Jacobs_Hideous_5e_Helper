import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

import { CoinState } from './coin.states';

const useStyles = makeStyles(() => ({
    coinFlipContainer: {
        
    },

    result: {

    }
}));

const borkedImageSrc = './images/Borked.png';
const headsImageSrc = './images/Heads.png';
const tailsImageSrc = './images/Tails.png';
const sideImageSrc = './images/Side.png';

export function CoinFlip() {
    const classes = useStyles();

    const [coinState, setCoinState] = useState<CoinState>();
    const [coinImageSrc, setCoinImageSrc] = useState<string>();

    function flipCoin(): void {
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
    }

    return (
        <div className={classes.coinFlipContainer}>
            <Button onClick={flipCoin}>F L I P</Button>

            <div className={classes.result}>
                <img alt='Coin Flip' src={coinImageSrc} />
                {coinState}
            </div>
        </div>
    );
}