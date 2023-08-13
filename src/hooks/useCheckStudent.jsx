import React, { useContext } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Providers/AuthProvider';

const useCheckStudent = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();


    const { data: student = {}, isLoading } = useQuery({
        queryKey: ['student', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/students/${user?.email}`)
            return res.data;
        }
    })

    return [student, isLoading];
};

export default useCheckStudent;