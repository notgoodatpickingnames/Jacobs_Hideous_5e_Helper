import './App.css';

import { AppRouter } from './routing/AppRouter';
import { AuthProvider } from './Utils/auth/auth.context';
import { FriendsProvider } from './Utils/profile/friends/friends.context';
import { ProfileProvider } from './Utils/profile/profile/profile.context';

function App() {
    return (
        <AuthProvider>
            <ProfileProvider>
                <FriendsProvider>
                    <AppRouter />
                </FriendsProvider>
            </ProfileProvider>
        </AuthProvider>
    );
}

export default App;
