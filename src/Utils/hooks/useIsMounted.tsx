import { useEffect, useRef } from 'react';

export function useIsMounted() {
    const isMounted = useRef<boolean>(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {isMounted.current = false};
    }, []);

    return isMounted;
}