import { useEffect, useRef } from 'react';

export const useMainLoop = (callback: (time: number, deltaTime: number) => void) => {
    const requestID = useRef<number>();
    const previousTime = useRef<number>();

    const loop = (time: number) => {
        if (previousTime.current !== undefined) {
            const deltaTime = time - previousTime.current;
            if (deltaTime > 10) {
                callback(time, deltaTime);
            }
        }

        previousTime.current = time;
        requestID.current = requestAnimationFrame(loop);
    }
    
    useEffect(()=>{
        requestID.current = requestAnimationFrame(loop);
        
        return () => cancelAnimationFrame(requestID.current);
    }, []);
}