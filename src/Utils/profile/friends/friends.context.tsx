import React, { createContext, ReactNode, useContext } from 'react';

import { FriendRelationship } from '.';
import { useFriendRelationships } from './useFriendRelationships';

interface FriendsContextObject {
    friends: FriendRelationship[];
    incomingRequests: FriendRelationship[];
    outGoingRequests: FriendRelationship[];
    createFriendRequest: (userId: string) => void;
    removeFriendRequest: (friendRequestId: string) => void;
    acceptFriendRequest: (relationship: FriendRelationship) => void;
}

export const FriendsContext = createContext<FriendsContextObject>({} as FriendsContextObject);

export function useFriendsContext() {
    return useContext(FriendsContext);
}

interface FriendsProviderProps {
    children: ReactNode | ReactNode[];
}

export function FriendsProvider({ children }: FriendsProviderProps) {
    const {friends, outGoingRequests, incomingRequests, createFriendRequest, removeFriendRequest, acceptFriendRequest} = useFriendRelationships();

    const FriendsContextObject: FriendsContextObject = {
        friends,
        outGoingRequests,
        incomingRequests,
        createFriendRequest,
        removeFriendRequest,
        acceptFriendRequest,
    }

    return (
        <FriendsContext.Provider value={FriendsContextObject}>
            {children}
        </FriendsContext.Provider>
    );
};