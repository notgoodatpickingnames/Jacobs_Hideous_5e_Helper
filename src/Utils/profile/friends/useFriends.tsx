import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect } from 'react';

import { useAuth } from '../../auth/auth.context';

export function useFriends() {
    const { user } = useAuth();

    useEffect(() => {
        if (Boolean(user)) {
            const db = getFirestore();
            
            const q = query(collection(db, 'friends'), where('to', '==', user.uid), where('accepted', '==', true));

            onSnapshot(q, ({docs}) => {
                console.log('Friends', docs.map((doc) => doc.data()));
            });
        }
    }, [user]);
}