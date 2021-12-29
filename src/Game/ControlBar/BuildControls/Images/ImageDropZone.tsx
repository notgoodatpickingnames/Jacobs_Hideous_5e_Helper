import React, { ReactNode } from 'react';

interface ImageDropZoneProps {
    children: ReactNode | ReactNode[];
    onImagesDrop: (images: File[]) => void;
}

export function ImageDropZone({children, onImagesDrop}: ImageDropZoneProps) {
    function onDragOver(event: DragEvent): void {
        if (event.dataTransfer.items.length > 0) {
            event.preventDefault();
        }
    }

    function handleOnDrop(event: DragEvent): void {
        const files = event.dataTransfer.files;

        if (files.length > 0) {
            event.preventDefault();

            onImagesDrop(Array.from(files));
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