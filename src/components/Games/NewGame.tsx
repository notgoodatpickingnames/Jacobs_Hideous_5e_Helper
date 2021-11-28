import { makeStyles } from '@mui/styles';
import { useRef, useState } from 'react';

import { theme } from '../../Utils/theme/theme';
import { Card } from '../Card';
import { Input, PrimaryButton } from '../Controls';
import { useGames } from './useGames';

const useStyles = makeStyles(() => ({
    gameContainer: {
        marginRight: '12px',
        transition: 'all .5s',
        width: '100px',
        height: '84px',
    },

    clickable: {
        cursor: 'pointer',
    },

    newGameWidth: {
        width: '360px',
    },

    newGame: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'baseline',
        paddingTop: '10px',
    },

    plusContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    plus: {
        position: 'relative',

        '&:before': {
            content: "' '",
            position: 'absolute',
            marginLeft: '-12px',
            width: '30px',
            borderTop: `6px solid ${theme.lightBlue}`,
        },

        '&:after': {
            content: "' '",
            position: 'absolute',
            marginTop: '-12px',
            height: '30px',
            borderLeft: `6px solid ${theme.lightBlue}`,
        },
    },
}));

export function NewGame() {
    const classes = useStyles();

    const [enteringGameData, setEnteringGameData] = useState<boolean>(false);
    const [newGameName, setNewGameName] = useState<string>('');

    const newGameInputSubmitted = useRef<boolean>(false);
    const [newGameNameError, setNewGameNameError] = useState<boolean>(false);

    const {createGame} = useGames();

    function onInputChange(inputValue: string): void {
        setNewGameName(inputValue);
        
        if (newGameInputSubmitted.current) {
            if (inputValue.length === 0) {
                setNewGameNameError(true);
            } else {
                setNewGameNameError(false);
            }
        }
    }

    function onCreate(event: any): void {
        event.stopPropagation();

        newGameInputSubmitted.current = true;
        
        if (newGameName.length > 0) {
            createGame(newGameName);
        
            setEnteringGameData(false);
            setNewGameName('');
        } else {
            setNewGameNameError(true);
        }
    }

    function onKeyDownOnInput(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            onCreate(event);
        }
    }

    return (
        <div className={`${!enteringGameData && classes.clickable}`}>
            <Card flickerSettings={{delay: 0, length: 0, randomFlickers: true}}>
                <div className={`${classes.gameContainer} ${enteringGameData && classes.newGameWidth}`} onClick={() => setEnteringGameData(true)}>
                    {
                        !enteringGameData ?
                            <div className={classes.plusContainer}>
                                <div className={classes.plus}></div>
                            </div> :
                            <div className={classes.newGame}>
                                <Input
                                    autoFocus={true}
                                    label={'Name'} value={newGameName}
                                    onChange={(event) => onInputChange(event.target.value)} 
                                    variant={'standard'}
                                    onKeyDown={(event: any) => onKeyDownOnInput(event as KeyboardEvent)}
                                    helperText={newGameNameError && 'Please type something.. anything.'}
                                    error={newGameNameError}
                                />

                                <PrimaryButton
                                    onClick={onCreate}
                                >
                                    Create
                                </PrimaryButton>
                            </div>
                    }
                </div>
            </Card>
        </div>
    );
}