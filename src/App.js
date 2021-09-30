import './App.css';

import { Game } from './Game';
import { WorldContextProvider } from './Game/context/world.context';

function App() {
    return (
        <WorldContextProvider>
            <Game />
        </WorldContextProvider>
    );
}

export default App;
