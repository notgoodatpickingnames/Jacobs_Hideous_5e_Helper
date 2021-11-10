import './App.css';

import { Game } from './Game';
import { WorldContextProvider } from './Game/context/world.context';
import { EngineContextProvider } from './Utils/engine';

function App() {
    return (
        <WorldContextProvider>
            <EngineContextProvider>
                <Game />
            </EngineContextProvider>
        </WorldContextProvider>
    );
}

export default App;
