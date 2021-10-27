import { useEffect } from 'react';

import { useFirestore } from '../../Utils/hooks/firestore/useFirestore';

export function useFirestoreTest() {
    const firestore = useFirestore();

    useEffect(() => {
        console.log('Running the firestore test');
        
        firestore.setDoc('TEST COLLECTION', 'TEST DOC 2', {data: 'DATA'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}