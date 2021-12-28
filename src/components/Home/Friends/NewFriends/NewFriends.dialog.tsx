import { PersonAdd } from '@mui/icons-material';
import { ClickAwayListener, Dialog } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useMemo, useState } from 'react';

import { useAuth } from '../../../../Utils/auth/auth.context';
import { useFriendsContext } from '../../../../Utils/profile/friends';
import { UserProfile } from '../../../../Utils/profile/profile/userProfile';
import { theme } from '../../../../Utils/theme/theme';
import { Card } from '../../../Card';
import { UserSearch } from '../UserSearch';

const useStyles = makeStyles(() => ({
    dialog: {
        width: '300px',
        backgroundColor: 'black',
        minHeight: '250px',
        paddingTop: '24px',
    },

    title: {
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
        marginBottom: '24px',
    },
    
    dialogContents: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    user: {
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
    },

    addUserIcon: {
        cursor: 'pointer',
        paddingLeft: '10px',

        '& :hover': {
            color: theme.lightBlue,
        },
    },

    userName: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '10px',
    },

    usersContainer: {
        marginTop: '20px',
        
    },
}));

export function NewFriendsDialog() {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);

    const { user } = useAuth();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const {friends, outGoingRequests, incomingRequests, createFriendRequest, acceptFriendRequest} = useFriendsContext();

    const usersThatCanBeFriended = useMemo(() => {
        return users.filter((u) => {
            const canFindUserInExistingFriends = Boolean(friends.find((friend) => friend.from === u.userId || friend.to === u.userId));
            const canFindUserInExistingOutgoingRequests = Boolean(outGoingRequests.find((request) => request.to === u.userId));
            
            return u.userId !== user.uid && !canFindUserInExistingFriends && !canFindUserInExistingOutgoingRequests;
        });
    }, [users, friends, outGoingRequests, user]);

    function onAddFriendClick(userId: string): void {
        const existingRequest = incomingRequests.find((request) => request.from === userId);

        if (Boolean(existingRequest)) {
            acceptFriendRequest(existingRequest);
        } else {
            createFriendRequest(userId);
        }
    }

    function handleClickAway(): void {
        setOpen(false);
        setUsers([]);
    }

    return (
        <>
            <div onClick={() => setOpen(!open)} className={classes.addUserIcon}>
                <PersonAdd />
            </div>

            <Dialog open={open}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div>
                        <Card>
                            <div className={classes.dialog}>
                                <div className={classes.title}>
                                    A D D &emsp; F R I E N D
                                </div>
                                <div className={classes.dialogContents}>
                                    <UserSearch onUsersChange={setUsers}/>
                                    
                                    <div className={classes.usersContainer}>
                                        {
                                            usersThatCanBeFriended.map((user, index) => 
                                                <div key={`user_${index}`} className={classes.user}>
                                                    <div className={classes.userName}>
                                                        {user.name}
                                                    </div>
                                                    <div onClick={() => onAddFriendClick(user.userId)} className={classes.addUserIcon}>
                                                        <PersonAdd />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </ClickAwayListener>
            </Dialog>
        </>
    );
}