import './App.css';

import { AppRouter } from './routing/AppRouter';
import { AuthProvider } from './Utils/auth/auth.context';
import { FriendsProvider } from './Utils/profile/friends/friends.context';

function App() {
    return (
        <AuthProvider>
            <FriendsProvider>
                <AppRouter />
            </FriendsProvider>
        </AuthProvider>
    );
}

export default App;
