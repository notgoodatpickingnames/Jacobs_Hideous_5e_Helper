import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, signOut, User } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import React, { createContext, ReactNode, useContext } from 'react';
import { useEffect, useState } from 'react';

import { UserProfile } from './userProfile';

interface AuthContextObject {
    user: User;
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
        const unsubscribe = getAuth().onAuthStateChanged((firebaseUser: User) => {
            setUser(firebaseUser);
        });

        listenForRedirectResult();        

        return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function listenForRedirectResult(): void {
        const auth = getAuth();
        getRedirectResult(auth).then(async (userCredentials) => {
            console.log('THE USER CREDENTIALS', userCredentials);
            if (Boolean(userCredentials)) {
                const userProfile = await getUserProfile(userCredentials.user.uid);

                if (Boolean(userProfile)) {
                    setUserProfile(userProfile);
                } else {
                    createUserAccount(userCredentials.user.uid);
                }
            }
        });
    }

    async function getUserProfile(userId: string): Promise<UserProfile> {
        const db = getFirestore();
        return await getDoc(doc(db, 'profiles', userId)).then((doc) => doc.data)
    }

    function signInWithGoogle(): void {
        console.log('Signing in with google');
        const googleProvider = new GoogleAuthProvider();
        signInWithRedirect(getAuth(), googleProvider);
    }

    function createUserAccount(userId: string): void {
        console.log('Creating User Account', userId);

        const db = getFirestore();
        getDoc(doc(db, 'profiles', userId)).then((userProfile) => {
            setDoc(doc(db, 'profiles', userId), {
                name: 't',
            });
        });
    }

    function logOut(): void {
        const auth = getAuth();
        signOut(auth);
    }

    const authContextObject: AuthContextObject = {
        user,
        signInWithGoogle,
        logOut,
    }

    return (
        <AuthContext.Provider value={authContextObject}>
            {children}
        </AuthContext.Provider>
    );
};