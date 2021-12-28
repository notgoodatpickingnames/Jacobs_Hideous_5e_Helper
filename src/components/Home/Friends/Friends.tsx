import { makeStyles } from '@mui/styles';
import React from 'react';

import { useFriendsContext } from '../../../Utils/profile/friends';
import { Card } from '../../Card';
import { FriendList } from './FriendList';
import { NewFriendsDialog } from './NewFriends/NewFriends.dialog';

const useStyles = makeStyles(() => ({
    container: {
        cursor: 'default',
    },

    friendsList: {
        padding: '24px',
        width: '250px',
    },

    addFriendContainer: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

export function Friends() {
    const classes = useStyles();

    const {friends, incomingRequests, outGoingRequests, removeFriendRequest, acceptFriendRequest} = useFriendsContext();

    return (
        <div className={classes.container}>
            <Card flickerSettings={{length: 1000, delay: 1000, randomFlickers: false}}>
                <div className={classes.friendsList}>
                    <div className={classes.addFriendContainer}>
                        <NewFriendsDialog />
                    </div>

                    <div>
                        <FriendList title='Friends' friends={friends} onRemoveFriend={removeFriendRequest}/>
                    </div>

                    <div>
                        <FriendList title='Incoming Requests' friends={incomingRequests} onAcceptFriend={acceptFriendRequest}/>
                    </div>

                    <div>
                        <FriendList title='Outgoing Requests' friends={outGoingRequests} onRemoveFriend={removeFriendRequest}/>
                    </div>
                </div>
            </Card>
        </div>
    )
}