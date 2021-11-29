import React, { ReactNode } from 'react';

import { useAssetManagerContext } from '../../../../Utils/engine/assetManager/assetManager.context';

interface ImageDropZoneProps {
    children: ReactNode | ReactNode[];
    imageStoragePath: string;
}

export function ImageDropZone({children, imageStoragePath}: ImageDropZoneProps) {
    const { addAsset } = useAssetManagerContext();

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

            for (let i = 0; i < files.length; i++) {
                addAsset(files[i]);
            }
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