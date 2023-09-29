import React, { useState } from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import busImg from '../../../assets/Common/bus-3.gif'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ShuttleUpdate = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: bus = [] } = useQuery({
        queryKey: ['bus'],
        queryFn: async () => {
            const res = await axiosSecure.get('/facultyBus')
            return res.data;
        }
    })

    return (
        <div>
            <UserCommonHeader></UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={busImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Shuttle Update </h1>
            </div>

            <div className="flex w-full overflow-x-auto my-8 mx-8">
                <table className="table-zebra table">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Bus No </th>
                            <th> Route </th>
                            <th> Current Status </th>
                            <th> Next Schedule </th>
                        </tr>
                    </thead>
                    <tbody>

                        {bus.map((b, index) =>
                            <tr>
                                <th> {index + 1} </th>
                                <td> {b.busNo} </td>
                                <td> {b.route} </td>
                                <td>
                                    <p className={`${b.currentStatus === "Ignition Off" ? 'text-red-500 font-bold' : b.currentStatus === "Running" ? 'text-amber-500 font-bold' : 'text-green-500 font-bold'}`}>
                                        {b.currentStatus} </p> </td>
                                <td> {b.nextSchedule} </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ShuttleUpdate;