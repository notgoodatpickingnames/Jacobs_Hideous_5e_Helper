import { Unsubscribe } from 'firebase/auth';
import { deleteDoc, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import React, { createContext, ReactNode, useContext } from 'react';
import { useEffect, useState } from 'react';

import { useAuth } from '../../auth/auth.context';
import { UserProfile } from './userProfile';

interface ProfileContextObject {
    userProfile: UserProfile;
    updateUserProfile: (profile: UserProfile, userId: string, oldDisplayName: string) => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextObject>({} as ProfileContextObject);

export function useProfileContext() {
    return useContext(ProfileContext);
}

interface ProfileProviderProps {
    children: ReactNode | ReactNode[];
}

export function ProfileProvider({ children }: ProfileProviderProps) {
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState<UserProfile>(undefined);

    async function updateUserProfile(profile: UserProfile, userId: string, oldDisplayName: string): Promise<void> {
        const db = getFirestore();

        setDoc(doc(db, `profiles/${userId}`), {
            ...profile,
        });

        if (Boolean(oldDisplayName)) {
            console.log('Deleting old name', oldDisplayName);
            await deleteDoc(doc(db, `usedUserNames/${oldDisplayName}`));
        }

        console.log('Creating New Name', profile.name);

        setDoc(doc(db, `usedUserNames/${profile.name}`), {
            userId,
        });
    }

    function listenForUserProfile(userId: string): Unsubscribe {
        const db = getFirestore();
        
        const unsub = onSnapshot(doc(db, `profiles/${userId}`), (doc) => {
            const userProfile = doc.data() as UserProfile;
            
            setUserProfile(userProfile);
        });

        return unsub;
    }

    useEffect(() => {
        if (Boolean(user)) {
            const unsubscribeFromUserProfileListener = listenForUserProfile(user.uid);

            return () => {unsubscribeFromUserProfileListener()};
        }
    }, [user]);

    const ProfileContextObject: ProfileContextObject = {
        userProfile,
        updateUserProfile,
    }

    return (
        <ProfileContext.Provider value={ProfileContextObject}>
            {children}
        </ProfileContext.Provider>
    );
};