import React, { useContext } from 'react';
import AuthContext from '../Providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';

const DBProvider = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    

    return (
        <div>

        </div>
    );
};

export default DBProvider;