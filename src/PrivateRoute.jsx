import {useUser} from './UserContext';
import {Navigate} from 'react-router-dom';

function PrivateRoute({ children }) {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Завантаження...</div>; // або спінер
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default PrivateRoute;
