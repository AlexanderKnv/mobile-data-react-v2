import {useContext} from 'react';
import { AuthContext } from '../hoc/AuthProvider';

/**
 * Ein benutzerdefinierter Hook, der den Authentifizierungskontext bereitstellt.
 *
 * @returns {Object} - Ein Objekt mit den Authentifizierungsinformationen (z. B. Benutzerdaten, Anmelde- und Abmeldemethoden).
 */

export function useAuth() {
    return useContext(AuthContext);
}
