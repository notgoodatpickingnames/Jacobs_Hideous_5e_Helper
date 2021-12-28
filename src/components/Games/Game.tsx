import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../Utils/auth/auth.context';
import { Card } from '../Card';
import { IconButton } from '../Controls/IconButtons/IconButton';
import { Game as GameModel } from './models/game';

const useStyles = makeStyles(() => ({
    gameCardContainer: {
        cursor: 'pointer',
    },

    gameContainer: {
        height: '60px',
        width: '400px',
        padding: '12px',
    },

    deleteContainer: {
        marginTop: '12px',
        display: 'flex',
        justifyContent: 'flex-end',
    }
}));

interface GameProps {
    game: GameModel;
    index: number;
    gameLoadingGlitchEffectOffset: number;
    gameLoadingGlitchEffectLength: number;
    delayVisibility: boolean;
    onDeleteGame: (gameId: string) => void;
}

export function Game({game, index, delayVisibility, gameLoadingGlitchEffectLength, gameLoadingGlitchEffectOffset, onDeleteGame}: GameProps) {
    const { user } = useAuth();
    const classes = useStyles();
    const navigate = useNavigate();

    function onGameClick(): void {
        navigate(`/game/${game.gameId}`);
    }

    const delayTime = !delayVisibility ? index * gameLoadingGlitchEffectOffset : 0;
    const isUserOwner = user.uid === game.ownerId;

    function onDeleteClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.stopPropagation();
        onDeleteGame(game.gameId);
    }

    return (
        <div className={classes.gameCardContainer} onClick={onGameClick}>
            <Card flickerSettings={{length: gameLoadingGlitchEffectLength, delay: delayTime, randomFlickers: true}} variant='corner'>
                <div className={classes.gameContainer}>
                    {game.name}

                    <div className={classes.deleteContainer}>
                        {   
                            isUserOwner && <IconButton icon={<DeleteIcon />} onClick={onDeleteClick}/>
                        }
                    </div>
                </div>
            </Card>
        </div>
    );
}