import { PersonAdd, PersonRemove } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid';

import { useAuth } from '../../../Utils/auth/auth.context';
import { FriendRelationship } from '../../../Utils/profile/friends';
import { theme } from '../../../Utils/theme/theme';

const useStyles = makeStyles(() => ({
    container: {
        padding: '20px',
    },

    title: {

    },

    friendLine: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    icon: {
        cursor: 'pointer',
        color: 'white',
        transition: 'all .5s',

        '& :hover': {
            color: theme.lightBlue,
        }
    }
}));

interface FriendListProps {
    title: string;
    friends: FriendRelationship[];
    onRemoveFriend?: (relationshipId: string) => void;
    onAcceptFriend?: (relationship: FriendRelationship) => void;
}

export function FriendList({title, friends, onRemoveFriend, onAcceptFriend}: FriendListProps) {
    const classes = useStyles();
    const { user } = useAuth();
    const listId = useRef<string>(uuid());

    return (
        <div className={classes.container}>
            <div>
                {title}
            </div>

            {
                friends.map((friend, index) => 
                    <div key={`friend_${index}_${listId}`} className={classes.friendLine}>
                        <span>&emsp;{friend.getOtherUserName(user.uid)}</span>
                        <div className={classes.icon}>
                            {Boolean(onRemoveFriend) && <PersonRemove onClick={() => onRemoveFriend(friend.friendRelationshipId)} />}
                            {Boolean(onAcceptFriend) && <PersonAdd onClick={() => onAcceptFriend(friend)} />}
                        </div>
                    </div>
                )
            }
        </div>
    );
}