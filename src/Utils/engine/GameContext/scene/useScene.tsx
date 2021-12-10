import { useAuth } from '../../../auth/auth.context';

export function useSceneSync() {
    const { user } = useAuth();
    const userId = user.uid;

    
}