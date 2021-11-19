import { makeStyles } from '@mui/styles';

import { Menu } from '../Menus/Menu';

const useStyles = makeStyles(() => ({
    
}));

export function Home() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Menu>
                <div style={{height: '100px', width: '100px'}}>
                    Test
                </div>
            </Menu>
        </div>
    )
}