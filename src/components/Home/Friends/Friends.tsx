import { makeStyles } from '@mui/styles';
import React from 'react';

import { useFriendsContext } from '../../../Utils/profile/friends';
import { Card } from '../../Card';
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

    const {} = useFriendsContext();

    return (
        <div className={classes.container}>
            <Card flickerSettings={{length: 1000, delay: 1000, randomFlickers: false}}>
                <div className={classes.friendsList}>
                    <UserSearch />
                </div>
            </Card>
        </div>
    )
}