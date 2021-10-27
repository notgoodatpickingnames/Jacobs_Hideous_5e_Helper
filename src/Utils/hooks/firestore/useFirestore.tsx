import { doc, Firestore, getFirestore, setDoc as setFirestoreDoc } from 'firebase/firestore';
import { useEffect, useRef } from 'react';

export function useFirestore() {
    const db = useRef<Firestore>();
    
    useEffect(() => {
        db.current = getFirestore();
    }, []);

    function setDoc(collectionName: string, documentName: string, data: any) {
        setFirestoreDoc(doc(db.current, collectionName, documentName), data);
    }

    return {
        setDoc,
    }
}