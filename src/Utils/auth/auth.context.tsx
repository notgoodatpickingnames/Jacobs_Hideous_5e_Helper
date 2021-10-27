import { User } from 'firebase/auth';
import React from 'react';
import { useEffect, useState } from 'react';

export const AuthContext = React.createContext<User | null>(null);

export function useAuth() {
    return React.useContext(AuthContext);
}

// export const AuthProvider: React.FC = ({ children }) => {
//     // const [user, setUser] = useState<User | null>(null);

//     // useEffect(() => {
//     //     const unsubscribe = auth.onAuthStateChanged((firebaseUser: User) => {
//     //         setUser(firebaseUser);
//     //     });

//     //     return unsubscribe;
//     // }, []);

//     // return (
//     //     <AuthContext.Provider value={user}>
//     //         {children}
//     //     </AuthContext.Provider>
//     // );
// };