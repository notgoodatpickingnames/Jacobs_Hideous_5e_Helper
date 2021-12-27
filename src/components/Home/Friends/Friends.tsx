import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';

import { useFriendsContext } from '../../../Utils/profile/friends';
import { Card } from '../../Card';
import { FriendList } from './FriendList';
import { UserSearch } from './UserSearch';

const useStyles = makeStyles(() => ({
    container: {
        cursor: 'default',
    },

    friendsList: {
        padding: '24px',
        width: '200px',
    },
}));

export function Friends() {
    const classes = useStyles();

    const {friends, incomingRequests, outGoingRequests} = useFriendsContext();

    return (
        <div className={classes.container}>
            <Card flickerSettings={{length: 1000, delay: 1000, randomFlickers: false}}>
                <div className={classes.friendsList}>
                    <UserSearch />
                </div>

                <div>
                    <FriendList title='Friends' friends={friends}/>
                </div>

                <div>
                    <FriendList title='Incoming Requests' friends={incomingRequests}/>
                </div>

                <div>
                    <FriendList title='Outgoing Requests' friends={outGoingRequests}/>
                </div>
            </Card>
        </div>
    )
}