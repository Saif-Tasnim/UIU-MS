import React, { useContext, useEffect, useState } from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import counsellingImg from '../../../assets/Common/counselling.gif';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCheckStudent from '../../../hooks/useCheckStudent';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const CounsellingPage = () => {

    const [axiosSecure] = useAxiosSecure();

    const { data: classes, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/counseling')
            return res.data;
        }
    })

    const handleAccept = () => {
        Swal.fire(
            'asho!',
            'room e achi ! ',
            'success'
        )
    }

    const handleReject = () => {
        Swal.fire(
            'free nai!',
            'pore ashen! ',
            'success'
        )
    }

    return (
        <div>
            <UserCommonHeader> </UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={counsellingImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Counselling Request </h1>
            </div>

            <div>

                {
                    <div className='card relative px-6 py-4 my-8 mx-6 mt-12 flex-row
 items-center max-w-[97%]'>

                        <div className='mr-20'>
                            {classes?.studentId}
                        </div>

                        <div className='mr-20'>
                            {classes?.big}
                        </div>

                        <div className='mr-20'>
                            {classes?.stime}
                        </div>

                        <div className='mr-20'>
                            {classes?.etime}
                        </div>

                        <div className='mr-20'>
                            {classes?.day}
                        </div>

                        <input type="submit" value="Accept" onClick={handleAccept} className='btn btn-success' />
                        <input type="reset" value="Reject" className='btn btn-error' onClick={handleReject} />

                    </div>
                }
            </div>
        </div>
    );
};

export default CounsellingPage;