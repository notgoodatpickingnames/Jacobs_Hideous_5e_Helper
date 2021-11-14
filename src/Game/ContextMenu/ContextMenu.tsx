import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';

import { useEngineContext } from '../../Utils/engine';
import { useContextMenuContext } from '../../Utils/engine/contextMenu.context';
import { Vector2 } from '../../Utils/engine/Vector2';
import { useWorldContext } from '../../Utils/engine/world.context';
import { MenuItem } from './MenuItem';

const useStyles = makeStyles(() => ({
    contextMenuContainer: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0',
        pointerEvents: 'none',
    },

    contextMenu: {
        position: 'absolute',
        padding: '20px',
        backgroundColor: 'black',
        color: 'white',
        pointerEvents: 'all',
    }
}));

export function ContextMenu() {
    const classes = useStyles();
    const [position, setPosition] = useState<Vector2>();
    const {addFunctionOnRender} = useEngineContext();
    const {getPositionInScreenSpace} = useWorldContext();
    const {isOpen, gameObject, menuItems} = useContextMenuContext();

    function onRender(): void {
        if (Boolean(gameObject)) {
            const objectPositionInScreenSpace = getPositionInScreenSpace(gameObject.transform.positionInWorld);
    
            setPosition(objectPositionInScreenSpace);
        } else {
            setPosition(undefined);
        }
    }

    useEffect(() => {
        addFunctionOnRender(onRender);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addFunctionOnRender]);

    return (
        <>
            {
                isOpen && 
                    <div className={classes.contextMenuContainer}>
                        <div className={classes.contextMenu} style={{top: position?.y, left: position?.x}} onClick={() => console.log('Clicked Context menu')}>
                            {
                                menuItems.map((menuItem, index) => 
                                    <MenuItem label={menuItem.label} onClick={menuItem.onClick}/>
                                )       
                            }
                        </div>
                    </div>
            }
        </>
        
    )
}