import { useState } from 'react';

import useEventListener from './useEventListener';

export function useButtonBeingHeld(keyCode: string) {
    const [isHolding, setIsHolding] = useState<boolean>();
    
    function onKeyDown(event: KeyboardEvent): void {
        console.log('Event', event);
    }

    useEventListener('keypress', (event) => onKeyDown(event as KeyboardEvent));
}