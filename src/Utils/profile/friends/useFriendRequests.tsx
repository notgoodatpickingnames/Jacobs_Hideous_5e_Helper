import { Unsubscribe } from 'firebase/auth';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAuth } from '../../auth/auth.context';
import { FriendRequest } from './friendRequest';

export function useFriendRequests() {
    const { user } = useAuth();

    const [outgoingFriendRequests, setOutgoingFriendRequests] = useState<FriendRequest[]>([]);
    const [incomingFriendRequests, setIncomingFriendRequests] = useState<FriendRequest[]>([]);

    useEffect(() => {
        if (Boolean(user)) {
            const unsubscribeFromOutgoingRequests = listenForOutgoingRequests(user.uid);
            const unsubscribeFromIncomingRequests = listenForIncomingRequests(user.uid);
            
            return () => {
                unsubscribeFromOutgoingRequests();
                unsubscribeFromIncomingRequests();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    function listenForOutgoingRequests(userId: string): Unsubscribe {
        const db = getFirestore();
        const outgoingRequestsQuery = query(collection(db, 'friendRequests'), where('from', '==', userId));

        const unsubscribeFromOutgoingRequests = onSnapshot(outgoingRequestsQuery, ({docs}) => {
            console.log('OUTGOING FRIEND REQUESTS', docs.map((doc) => doc.data()));
        });

        return unsubscribeFromOutgoingRequests;
    }

    function listenForIncomingRequests(userId: string): Unsubscribe {
        const db = getFirestore();
        const incomingRequestsQuery = query(collection(db, 'friendRequests'), where('from', '==', user.uid));

        const unsubscribeFromIncomingRequests = onSnapshot(incomingRequestsQuery, ({docs}) => {
            console.log('INCOMING FRIEND REQUESTS', docs.map((doc) => doc.data()));
        });

        return unsubscribeFromIncomingRequests;
    }

    function createFriendRequest(userId: string): void {
        // add friend to this users friends list
        // create friend request with other users id in to field and this users id in from field
    }
    
    function removeFriendRequest(friendRequestId: string): void {
        // removes the friend request entirely which will remove it from any lists for both players
    }

    function acceptFriendRequest(friendRequestId: string): void {
        // add the from players id to this users friends list
        // remove friend request
    }
}