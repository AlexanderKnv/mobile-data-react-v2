import {createContext, useState} from 'react';

/**
 * Der Kontext für die Authentifizierungsinformationen.
 *
 * @type {React.Context} - Der Kontext für die Authentifizierungsinformationen.
 */

export const AuthContext = createContext(null);

/**
 * Der Anbieter für die Authentifizierungsinformationen, der den Kontext verwaltet.
 *
 * @param {Object} props - Die Eigenschaften des Anbieters.
 * @param {React.ReactNode} props.children - Die untergeordneten Elemente, die den Kontext verwenden.
 *
 * @returns {JSX.Element} - Das JSX-Element des Authentifizierungsanbieters.
 */

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    /**
     * Meldet den Benutzer an und aktualisiert den Kontext.
     *
     * @param {string} newUser - Der neue angemeldete Benutzer.
     * @param {Function} cb - Die Callback-Funktion, die nach dem Anmelden aufgerufen wird.
     */

    const signin = (newUser, cb) => {
        setUser(newUser);
        localStorage.setItem('authUser', newUser);
        cb();
    }

    /**
     * Meldet den Benutzer ab und aktualisiert den Kontext.
     *
     * @param {Function} cb - Die Callback-Funktion, die nach dem Abmelden aufgerufen wird.
     */
    const signout = (cb) => {
        setUser(null);
        localStorage.removeItem('authUser');
        // localStorage.clear();
        // sessionStorage.clear();
        cb();
    }

    /**
     * Führt den Logout-Zeitpunkt für den Benutzer aus.
     *
     * @param {string} user - Der Benutzer, für den der Logout-Zeitpunkt ausgeführt wird.
     */

    const value = {user, signin, signout}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
