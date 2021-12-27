import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { UserProfile } from '../../../Utils/profile/profile/userProfile';
import { Input } from '../../Controls';

const useStyles = makeStyles(() => ({
    container: {

    }
}));

export function UserSearch() {
    const [names, setNames] = useState<string[]>([]);
    const [nameSearch, setNameSearch] = useState<string>('');
    const [id] = useState<string>(uuid());

    useEffect(() => {
        if (Boolean(nameSearch)) {
            searchNames(nameSearch).then((names) => {
                console.log('names', names);
                setNames(names);
            });
        }
    }, [nameSearch]);

    async function searchNames(search: string): Promise<string[]> {
        const db = getFirestore();
        const q = query(collection(db, 'profiles'), where('name', '>=', search), where('name', '<=', search+ '\uf8ff'), where('name', '!=', ''));
        
        const querySnapshot = await getDocs(q);
        const names = querySnapshot.docs.map((doc) => (doc.data() as UserProfile).name);

        return names;
    }


    return (
        <div>
            <Autocomplete
                options={names}
                id={`friend_search_${id}`}
                renderInput={(params) =>
                    <Input
                        {...params}
                        inputProps={params.inputProps}
                        label={'Friend Search'}
                        value={nameSearch}
                        placeholder="Friend's Email"
                        onChange={(event) => setNameSearch(event.target.value)} 
                    />
                }
            />
            
        </div>
        
    )
}