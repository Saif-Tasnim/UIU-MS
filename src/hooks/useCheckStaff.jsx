import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCheckStaff = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const {data: staff={} , isLoading: staffLoading } = useQuery({
        queryKey: ['staff', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staff/${user?.email}`)
            return res.data;
        }
    })

    return [ staff, staffLoading ]
};

export default useCheckStaff;