import { useEffect, useState } from 'react';

import { useAuth } from '../../auth/auth.context';

export function useFriends() {
    const { user } = useAuth();

}