import {useLocation, Navigate} from 'react-router-dom';
import {useAuth} from '../hook/useAuth';

/**
 * Eine Komponente, die sicherstellt, dass nur authentifizierte Benutzer auf bestimmte Seiten zugreifen können.
 *
 * @param {Object} props - Die Eigenschaften der Komponente.
 * @param {React.ReactNode} props.children - Die untergeordneten Elemente, auf die diese Komponente angewendet wird.
 *
 * @returns {JSX.Element} - Die gerenderten untergeordneten Elemente, wenn der Benutzer authentifiziert ist, oder eine Umleitung zur Login-Seite, wenn nicht.
 */

const RequireAuth = ({children}) => {
    const location = useLocation();
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/mobileClient" state={{from: location}} />
    }

    return children;
}

export {RequireAuth};
