import './App.css';

import { AppRouter } from './routing/AppRouter';
import { AuthProvider } from './Utils/auth/auth.context';

function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}

export default App;
