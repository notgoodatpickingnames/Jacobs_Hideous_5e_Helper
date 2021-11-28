import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
    container: {
        height: '300px',
        width: '300px',
        position: 'fixed',
        top: '0',
        right: '0',
        backgroundColor: 'white',
    },
}));

export function Images() {
    const classes = useStyles();

    function onDragOver(event: DragEvent): void {
        if (event.dataTransfer.items.length > 0) {
            console.log('EVENT BEING STOPPED ON DRAG');
            event.preventDefault();
        }
    }

    function handleFiles(): void {

    }

    function handleOnDrop(event: DragEvent): void {
        const files = event.dataTransfer.files;

        if (files.length > 0) {
            event.preventDefault();
            console.log('Gonna upload files', files);
        }
    }

    return (
        <div
            className={classes.container}
            onDrop={(event: any) => handleOnDrop(event as DragEvent)}
            onDragOver={(event: any) => onDragOver(event as DragEvent)}
        >
            
        </div>
    )
}