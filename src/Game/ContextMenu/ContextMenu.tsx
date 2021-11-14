import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';

import { useEngine } from '../../Utils/engine/Engine';
import { Vector2 } from '../../Utils/engine/models/Vector2';
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

    const engine = useEngine();
    const {addFunctionOnRender} = engine.engineContext;
    const {getPositionInScreenSpace} = engine.worldContext;
    const {isOpen, gameObject, menuItems} = engine.contextMenuContext;

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
                        <div className={classes.contextMenu} style={{top: position?.y, left: position?.x}} >
                            {
                                menuItems.map((menuItem, index) => 
                                    <MenuItem key={`Menu_Item_${menuItem.label}_${index}`} label={menuItem.label} onClick={() => menuItem.onClick(engine)} />
                                )       
                            }
                        </div>
                    </div>
            }
        </>
        
    )
}