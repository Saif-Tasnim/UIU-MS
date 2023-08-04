import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useStudent = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: students = [], refetch, isLoading:dataLoading } = useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const res = await axiosSecure.get('/students')
            return res.data;
        }
    })
    return [students, refetch, dataLoading]
};

export default useStudent;