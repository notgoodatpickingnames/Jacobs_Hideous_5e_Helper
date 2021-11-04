import './App.css';

import { Game } from './Game';
import { DragContextProvider } from './Game/context/drag.context';
import { WorldContextProvider } from './Game/context/world.context';
import { EngineContextProvider } from './Utils/engine';

function App() {
    return (
        <WorldContextProvider>
            <EngineContextProvider>
                <DragContextProvider>
                    <Game />
                </DragContextProvider>
            </EngineContextProvider>
        </WorldContextProvider>
    );
}

export default App;
