import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { UserProfile } from '../../../Utils/profile/profile/userProfile';
import { Input } from '../../Controls';

interface UserSearchProps {
    onUsersChange: (users: UserProfile[]) => void;
}

export function UserSearch({onUsersChange}: UserSearchProps) {
    const [nameSearch, setNameSearch] = useState<string>('');

    useEffect(() => {
        if (Boolean(nameSearch)) {
            searchNames(nameSearch).then((users) => {
                onUsersChange(users);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameSearch]);

    useEffect(() => {
        return () => {setNameSearch('')};
    }, []);

    async function searchNames(search: string): Promise<UserProfile[]> {
        const db = getFirestore();
        const q = query(collection(db, 'profiles'), where('name', '>=', search), where('name', '<=', search+ '\uf8ff'), where('name', '!=', ''));
        
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => {
            const profile = (doc.data() as UserProfile);
            profile.userId = doc.id;
            
            return profile;
        });

        return users;
    }

    return (
        <div>
            <Input
                label={'Friend Search'}
                value={nameSearch}
                placeholder="Friend's Email"
                onChange={(event) => setNameSearch(event.target.value)} 
            />
        </div>
        
    )
}