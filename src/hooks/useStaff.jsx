import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useStaff = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: staffs = [], refetch } = useQuery({
        queryKey: ['staffs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/staff')
            return res.data;
        }
    })
    return [staffs, refetch];
};

export default useStaff;