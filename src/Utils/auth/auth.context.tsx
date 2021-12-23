import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, signOut, User } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import React, { createContext, ReactNode, useContext } from 'react';
import { useEffect, useState } from 'react';

import { UserProfile } from './userProfile';

interface AuthContextObject {
    user: User;
    userProfile: UserProfile;
    signInWithGoogle: () => void;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextObject>({} as AuthContextObject);

export function useAuth() {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: ReactNode | ReactNode[];
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile>(undefined);

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(async (firebaseUser: User) => {
            setUser(firebaseUser);

            if (Boolean(firebaseUser)) {
                const userProfile = await getUserProfile(firebaseUser.uid);
                setUserProfile(userProfile);
            }
        });

        listenForRedirectResult();        

        return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function listenForRedirectResult(): void {
        const auth = getAuth();
        getRedirectResult(auth).then(async (userCredentials) => {
            if (Boolean(userCredentials)) {
                const userProfile = await getUserProfile(userCredentials.user.uid);
                
                if (Boolean(userProfile)) {
                    setUserProfile(userProfile);
                } else {
                    createUserProfile(userCredentials.user.uid);
                }
            }
        });
    }

    async function getUserProfile(userId: string): Promise<UserProfile> {
        const db = getFirestore();
        const profileAsDoc = await getDoc(doc(db, 'profiles', userId));
        
        if (profileAsDoc.exists()) {
            return profileAsDoc.data() as UserProfile;
        }
        
        return undefined;
    }

    function signInWithGoogle(): void {
        const googleProvider = new GoogleAuthProvider();
        signInWithRedirect(getAuth(), googleProvider);
    }

    function createUserProfile(userId: string): void {
        const db = getFirestore();
        
        setDoc(doc(db, 'profiles', userId), {
            name: '',
        });
    }

    function logOut(): void {
        const auth = getAuth();
        signOut(auth);
    }

    const authContextObject: AuthContextObject = {
        user,
        userProfile,
        signInWithGoogle,
        logOut,
    }

    return (
        <AuthContext.Provider value={authContextObject}>
            {children}
        </AuthContext.Provider>
    );
};