import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: "http://localhost:5000/",
});

const useAxiosSecure = () => {
    const { logOut, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        });

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401 || error.response.status === 403) {
                    logOut().then(() => {
                        navigate('/login');
                    });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };

    }, [logOut, navigate]);

    return [axiosSecure];
};

export default useAxiosSecure;
