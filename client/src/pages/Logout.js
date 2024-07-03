import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {
    const { unsetUser } = useContext(UserContext);

    useEffect(() => {
        // Clear local storage and unset user context
        localStorage.clear();
        unsetUser();
    }, [unsetUser]);

    // Navigate back to login
    return <Navigate to="/" />;
}