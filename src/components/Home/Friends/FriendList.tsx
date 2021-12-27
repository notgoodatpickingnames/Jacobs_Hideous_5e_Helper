import { makeStyles } from '@mui/styles';
import React from 'react';

import { useAuth } from '../../../Utils/auth/auth.context';
import { FriendRelationship } from '../../../Utils/profile/friends';

const useStyles = makeStyles(() => ({
    container: {
        padding: '20px',
    },

    title: {

    }
}));

interface FriendListProps {
    title: string;
    friends: FriendRelationship[];
}

export function FriendList({title, friends}: FriendListProps) {
    const classes = useStyles();
    const { user } = useAuth();

    console.log('Got the friends', friends);

    return (
        <div className={classes.container}>
            <div>
                {title}
            </div>

            {
                friends.map((friend) => 
                    <div>
                        {friend.getOtherUserName(user.uid)}
                    </div>
                )
            }
        </div>
    );
}