import React, { createContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../Firebase/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const userInfo = {
        user,
        loading,
        signIn,
    }

    return (
        <AuthContext.Provider value={userInfo}
        > {children}  </AuthContext.Provider>
    );
};

export default AuthProvider;