import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, signOut,
    onAuthStateChanged, signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, 'users', email), {
            savedShows: []
        })
    }

    function logOut() {
        return signOut(auth);
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