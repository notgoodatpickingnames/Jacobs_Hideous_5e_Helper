import { getAuth, GoogleAuthProvider, signInWithRedirect, User } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { createContext, ReactNode, useContext } from 'react';
import { useEffect, useState } from 'react';

interface AuthContextObject {
    user: User;
    signInWithGoogle: () => void;
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

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged((firebaseUser: User) => {
            setUser(firebaseUser);
        });

        return unsubscribe;
    }, []);

    function signInWithGoogle(): void {
        console.log('Signing in with google');
        const googleProvider = new GoogleAuthProvider();
        signInWithRedirect(getAuth(), googleProvider).then();
    }

    function createUserAccount(userId: string): void {
        console.log('Creating User Account', userId);

        const db = getFirestore();
        setDoc(doc(db, 'Profiles', userId), {});
    }

    const authContextObject: AuthContextObject = {
        user,
        signInWithGoogle,
    }

    return (
        <AuthContext.Provider value={authContextObject}>
            {children}
        </AuthContext.Provider>
    );
};