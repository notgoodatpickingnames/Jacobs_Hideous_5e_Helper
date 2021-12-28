import { Unsubscribe } from 'firebase/auth';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
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
        const db = getFirestore();
        
        addDoc(collection(db, 'friends'), {
            accepted: false,
            from: user.uid,
            to: userId,
        });
    }
    
    function removeFriendRequest(relationshipId: string): void {
        const db = getFirestore();

        deleteDoc(doc(db, `friends/${relationshipId}`));
    }

    function acceptFriendRequest(relationship: FriendRelationship): void {
        const db = getFirestore();
        
        setDoc(doc(db, `friends/${relationship.friendRelationshipId}`), {
            accepted: true,
            from: relationship.from,
            to: relationship.to,
        });
    }

    return {friends, outGoingRequests, incomingRequests, createFriendRequest, removeFriendRequest, acceptFriendRequest};
}