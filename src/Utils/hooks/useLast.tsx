import { useEffect, useRef } from 'react';

export function useLast<T>(value: T) {
    const lastValue = useRef(value);

    useEffect(() => {
        lastValue.current = value;
    }, [value]);

    return lastValue.current;
}