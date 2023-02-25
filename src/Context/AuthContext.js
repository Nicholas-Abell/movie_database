import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, signOut,
    onAuthStateChanged, signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from '../firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut;
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unSubScribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unSubScribe();
        }
    })

    return (
        <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext);
}