import { Unsubscribe } from 'firebase/auth';
import { collection, doc, getDoc, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { FriendRelationship } from '.';
import { useAuth } from '../../auth/auth.context';
import { useProfileContext } from '../profile';
import { UserProfile } from '../profile/userProfile';
import { IFriendRelationship } from './IFriendRelationship';

export function useFriendRelationships() {
    const { user } = useAuth();
    const { userProfile } = useProfileContext();

    const [outgoingFriendRelationships, setOutgoingFriendRelationships] = useState<FriendRelationship[]>([]);
    const [incomingFriendRelationships, setIncomingFriendRelationships] = useState<FriendRelationship[]>([]);

    const outGoingRequests = useMemo(() => outgoingFriendRelationships.filter((relationship) => !relationship.accepted), [outgoingFriendRelationships]);
    const incomingRequests = useMemo(() => incomingFriendRelationships.filter((relationship) => !relationship.accepted), [incomingFriendRelationships]);
    const friends = useMemo(() => [...outgoingFriendRelationships, ...incomingFriendRelationships].filter((relationship) => relationship.accepted), [outgoingFriendRelationships, incomingFriendRelationships]);

    useEffect(() => {
        if (Boolean(user?.uid) && Boolean(userProfile)) {
            const unsubscribeFromOutgoingRequests = listenForOutgoingRequests(user.uid);
            const unsubscribeFromIncomingRequests = listenForIncomingRequests(user.uid);
            
            return () => {
                unsubscribeFromOutgoingRequests();
                unsubscribeFromIncomingRequests();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.uid, userProfile]);

    function listenForOutgoingRequests(userId: string): Unsubscribe {
        const db = getFirestore();
        const outgoingRequestsQuery = query(collection(db, 'friends'), where('from', '==', userId));

        const unsubscribeFromOutgoingRequests = onSnapshot(outgoingRequestsQuery, async ({docs}) => {
            const outgoingRequestPromises = docs.map(async (document) => {
                const relationship = document.data() as IFriendRelationship;
                relationship.friendRelationshipId = document.id;
                const toProfile = (await getDoc(doc(db, `profiles/${relationship.to}`))).data() as UserProfile;

                return new FriendRelationship(relationship, userProfile?.name, toProfile?.name);
            });

            const outgoingRequests = await Promise.all(outgoingRequestPromises);
            setOutgoingFriendRelationships(outgoingRequests);
        });

        return unsubscribeFromOutgoingRequests;
    }

    function listenForIncomingRequests(userId: string): Unsubscribe {
        const db = getFirestore();
        const incomingRequestsQuery = query(collection(db, 'friends'), where('to', '==', userId));

        const unsubscribeFromIncomingRequests = onSnapshot(incomingRequestsQuery, async ({docs}) => {
            const incomingRequestPromises = docs.map(async (document) => {
                const relationship = document.data() as IFriendRelationship;
                relationship.friendRelationshipId = document.id;
                const fromProfile = (await getDoc(doc(db, `profiles/${relationship.from}`))).data() as UserProfile;

                return new FriendRelationship(relationship, fromProfile?.name, userProfile?.name);
            });

            const incomingRequests = await Promise.all(incomingRequestPromises);
            setIncomingFriendRelationships(incomingRequests);
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

    return {friends, outGoingRequests, incomingRequests, createFriendRequest, removeFriendRequest, acceptFriendRequest};
}