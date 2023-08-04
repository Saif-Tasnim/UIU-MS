import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useFaculty = () => {
    const [axiosSecure] = useAxiosSecure();

    const {data: faculties=[], refetch} = useQuery({
        queryKey: ['faculties'],
        queryFn: async () =>{
            const res = await axiosSecure.get("/faculty")
            return res.data;
        }
    })

    return [faculties, refetch];
};

export default useFaculty;