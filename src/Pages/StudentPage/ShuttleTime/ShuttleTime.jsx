import React from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import busImg from '../../../assets/Common/bus-3.gif';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ShuttleTime = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: bus = [], refetch } = useQuery({
        queryKey: ['bus'],
        queryFn: async () => {
            const res = await axiosSecure.get('/studentShuttle')
            return res.data;
        }
    })

    return (
        <div>
            <UserCommonHeader></UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={busImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Shuttle Schedule List </h1>
            </div>

            <div className="flex w-full overflow-x-auto my-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Shuttle No </th>
                            <th> From </th>
                            <th> To </th>
                            <th> Current Status </th>
                            <th> Next Schedule </th>
                            <th> Current Location </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bus.map((b, index) =>
                                <tr key={b._id}>
                                    <th> {index + 1} </th>
                                    <td> {b.shuttleNo} </td>
                                    <td> {b.from} </td>
                                    <td> {b.to} </td>
                                    <td>
                                        <p className={`${b.currentStatus === "Ignition Off" ? 'text-red-500 font-bold' : b.currentStatus === "Running" ? 'text-amber-500 font-bold' : b.currentStatus === "Parking Zone" ? 'text-indigo-500 font-bold' : 'text-green-500 font-bold'}`}>
                                            {b.currentStatus} </p> </td>

                                    <td> {b.nextSchedule ? b.nextSchedule : "-------"} </td>
                                    <td> {b.currentLocation}  </td>

                                </tr>

                            )

                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default ShuttleTime;