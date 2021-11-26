import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

import { useAuth } from '../../Utils/auth/auth.context';
import { Card } from '../Card';
import { Game } from './models/game';
import { useGames } from './useGames';

const useStyles = makeStyles(() => ({
    gameContainer: {
        height: '160px',
        width: '150px',
        marginRight: '12px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    clickable: {
        cursor: 'pointer',
    },

    plus: {
        position: 'relative',

        '&:before': {
            content: "' '",
            position: 'absolute',
            marginLeft: '-35px',
            width: '80px',
            borderTop: '10px solid',
        },

        '&:after': {
            content: "' '",
            position: 'absolute',
            marginTop: '-35px',
            height: '80px',
            borderLeft: '10px solid',
        },
    }
}));

export function NewGame() {
    const classes = useStyles();

    const [enteringGameData, setEnteringGameData] = useState<boolean>(false);
    const [newGameName, setNewGameName] = useState<string>('');

    const {createGame} = useGames();

    function onCreate(event: any): void {
        event.stopPropagation();
        
        createGame(newGameName);
        
        setEnteringGameData(false);
        setNewGameName('');
    }

    return (
        <Card flickerSettings={{delay: 0, length: 0, randomFlickers: true}}>
            <div className={`${classes.gameContainer} ${!enteringGameData && classes.clickable}`} onClick={() => setEnteringGameData(true)}>
                {
                    !enteringGameData ?
                        <div className={classes.plus}></div> :
                        <div>
                            <TextField
                                inputProps={{
                                    style: {color: 'white'}
                                }}
                                label={'Name'} value={newGameName}
                                onChange={(event) => setNewGameName(event.target.value)}>
                            </TextField>

                            <Button onClick={onCreate}>Create</Button>
                        </div>
                }
            </div>
        </Card>
    );
}