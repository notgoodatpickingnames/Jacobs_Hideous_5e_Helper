import { debounce } from '@mui/material';
import { collection, documentId, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '../../Utils/auth/auth.context';
import { useProfileContext } from '../../Utils/profile/profile';
import { Input } from '../Controls';

export function DisplayName() {
    const { user } = useAuth();
    const { updateUserProfile, userProfile } = useProfileContext();

    const [userNameAlreadyTakenError, setUserNameAlreadyTakenError] = useState<boolean>(false);

    const [displayName, setDisplayName] = useState<string>('');
    
    const debouncedHandleDisplayNameChange = useRef(debounce((newDisplayName: string, oldDisplayName: string) => handleDisplayNameChange(newDisplayName, oldDisplayName), 600));

    useEffect(() => {
        if (Boolean(userProfile)) {
            setDisplayName(userProfile.name);
        }
    }, [userProfile]);

    function onDisplayNameChange(newDisplayName: string, oldDisplayName: string): Promise<void> {
        setDisplayName(newDisplayName);

        if (Boolean(newDisplayName)) {
            debouncedHandleDisplayNameChange.current(newDisplayName, oldDisplayName);
        }

        return;
    }

    async function handleDisplayNameChange(newDisplayName: string, oldDisplayName: string): Promise<void> {
        if (await isNameInUse(newDisplayName)) {
            setUserNameAlreadyTakenError(true);
        } else {
            setUserNameAlreadyTakenError(false);
            await updateUserProfile({name: newDisplayName}, user.uid, oldDisplayName);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps

    async function isNameInUse(displayName: string): Promise<boolean> {
        const db = getFirestore();
        const q = query(collection(db, 'usedUserNames'), where(documentId(), '==', displayName));
        const {docs} = await getDocs(q);

        const userNamesNotTiedToUser = docs.filter((doc) => {
            const {userId: documentUserId} = doc.data() as {userId: string};

            return documentUserId !== user.uid;
        })

        return userNamesNotTiedToUser.length > 0;
    }

    return (
        <div>
            <Input
                label={'Display Name'}
                value={displayName}
                onChange={(event) => onDisplayNameChange(event.target.value.trim(), userProfile.name.trim())}
                helperText={userNameAlreadyTakenError && 'Name already taken.'}
                error={userNameAlreadyTakenError}
            />
        </div>
    )
}