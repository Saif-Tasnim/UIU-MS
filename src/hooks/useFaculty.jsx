import React, { useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useFaculty = () => {
    
    const [axiosSecure] = useAxiosSecure();

    const {data: faculties=[], refetch , isLoading:dataLoading} = useQuery({
        queryKey: ['faculties'],
        queryFn: async () =>{
            
            const res = await axiosSecure.get("/faculty")
            return res.data;
        }
    })

   

    return [faculties, refetch , dataLoading];
};

export default useFaculty;