import './App.css';

import { Game } from './Game';
import { EngineProvider } from './Utils/engine/Engine';

function App() {
    return (
        <EngineProvider>
            <Game />
        </EngineProvider>
    );
}

export default App;
