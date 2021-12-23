import React, { createContext, ReactNode, useContext } from 'react';
import { useEffect, useState } from 'react';

import { useFriendRequests } from './useFriendRequests';
import { useFriends } from './useFriends';

interface FriendsContextObject {
    
}

export const FriendsContext = createContext<FriendsContextObject>({} as FriendsContextObject);

export function useFriendsContext() {
    return useContext(FriendsContext);
}

interface FriendsProviderProps {
    children: ReactNode | ReactNode[];
}

export function FriendsProvider({ children }: FriendsProviderProps) {
    const friends = useFriends();
    useFriendRequests();

    const FriendsContextObject: FriendsContextObject = {
        
    }

    return (
        <FriendsContext.Provider value={FriendsContextObject}>
            {children}
        </FriendsContext.Provider>
    );
};