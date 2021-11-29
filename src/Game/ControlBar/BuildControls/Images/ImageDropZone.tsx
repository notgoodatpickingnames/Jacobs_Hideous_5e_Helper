import React, { ReactNode } from 'react';

interface ImageDropZoneProps {
    children: ReactNode | ReactNode[];
}

export function ImageDropZone({children}: ImageDropZoneProps) {
    function onDragOver(event: DragEvent): void {
        if (event.dataTransfer.items.length > 0) {
            event.preventDefault();
        }
    }

    function handleOnDrop(event: DragEvent): void {
        const files = event.dataTransfer.files;

        if (files.length > 0) {
            event.preventDefault();
            console.log('Gonna upload files', files, 'test');
        }
    }

    return (
        <div
            onDrop={(event: any) => handleOnDrop(event as DragEvent)}
            onDragOver={(event: any) => onDragOver(event as DragEvent)}
        >
            {children}
        </div>
    )
}