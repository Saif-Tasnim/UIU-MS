import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (name) => {
          return updateProfile(auth.currentUser, {
              displayName: name
          })
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if (currentUser) {
                axios.post('http://localhost:5000/jwt', { email: currentUser?.email })
                    .then(data => {
                        // console.log(data.data.token);
                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false);
                    })

            }

            else {
                localStorage.removeItem("access-token");
            }
        })
        return () => unsubscribe()
    }, [])

    const userInfo = {
        user,
        loading,
        signIn,
        signUp,
        updateUser,
        logOut,
    }

    return (
        <AuthContext.Provider value={userInfo}
        > {children}  </AuthContext.Provider>
    );
};

export default AuthProvider;