import React, { createContext, MutableRefObject, ReactNode, useContext, useRef } from 'react';

import { Vector2 } from '../../Utils/engine/Vector2';
import useEventListener from '../../Utils/hooks/useEventListener';
import { useCanvasContext } from '../hooks/useCanvasContext';
import { useMousePositionInWorld } from '../hooks/useMousePositionInWorld';
import { useWorldContext } from './world.context';

interface DragContextObject {
    
}

export const DragContext = createContext<DragContextObject>({} as DragContextObject);

export function useDragContext(): DragContextObject {
    return useContext(DragContext);
}

interface DragContextProviderProps {
    children: ReactNode[];
}

export function DragContextProvider({children}: DragContextProviderProps) {
    const {canvas} = useWorldContext();

    function onDragStart(event: DragEvent): void {
        console.log('DRAG ENTER', event.target);
        var rect: DOMRect = (event.target as any).getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;
    
        const mousePositionInImage = new Vector2(relativeX, relativeY);
    }

    function replaceDragElementWithClone(): void {

    }

    function onDrop(event: any): void {
        console.log('Dropped Onto Canvas', event);
    }

    function allowDrop(event: any): void{
        event.preventDefault();
    }

    useEventListener('drop', onDrop, canvas);
    useEventListener('dragover', allowDrop, canvas)

    const dragContextObject = {

    }

    return (
        <DragContext.Provider value={dragContextObject}>
            {children}
        </DragContext.Provider>
    )
}