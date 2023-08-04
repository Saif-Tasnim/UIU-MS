import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useFacultyCheck = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: faculty = {}, isLoading: facultyLoading } = useQuery({
        queryKey: ['faculty', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/faculty/${user?.email}`)
            return res.data;
        }
    })

    return [faculty, facultyLoading]
};

export default useFacultyCheck;