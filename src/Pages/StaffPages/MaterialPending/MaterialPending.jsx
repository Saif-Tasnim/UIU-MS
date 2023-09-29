import React, { useState } from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader'
import materialImg from '../../../assets/Common/animation_lllyi0vi_small.gif'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCheckStaff from '../../../hooks/useCheckStaff';
import Swal from 'sweetalert2';

const MaterialPending = () => {
    const [axiosSecure] = useAxiosSecure();
    const [staff] = useCheckStaff();

    const { data: pending = [], refetch } = useQuery({
        queryKey: ['pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/officeMaterials')
            return res.data;
        }
    })

    const handleDeliver = async (id) => {
        const fullName = `${staff.firstName} ${staff.lastName}`
        const addedData = { staffEmail: staff.email, status: 'accept', staffName: fullName };

        const res = await axiosSecure.patch(`/officeMaterials/${id}`, addedData)
        if(res.data.modifiedCount > 0) {
            Swal.fire(
                'Granted!',
                'Please Provide Materials ASAP.',
                'success'
            )
        }
    }


    return (
        <div>
            <UserCommonHeader> </UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={materialImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Material Pending Request </h1>
            </div>

            {/* table */}

            <div className="flex w-full overflow-x-auto my-10 mx-3">
                <table className="table-hover table">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th>
                                <p className='text-center border-none'> Faculty Name
                                </p> </th>
                            <th>
                                <p className='text-center border-none'> Room No </p>
                            </th>
                            <th>
                                <p className='text-center border-none'> Marker </p>
                            </th>
                            <th>
                                <p className='text-center border-none'> Ct Paper </p> </th>
                            <th>
                                <p className='text-center border-none'> A4 Paper </p>
                            </th>
                            <th>
                                <p className='text-center border-none'>
                                    Stapler Pin </p> </th>
                            <th>
                                <p className='text-center border-none'> Other Material </p> </th>
                            <th>
                                <p className='text-center border-none'> Action </p>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            pending.map((p, index) =>
                                <tr>
                                    <th> {index + 1} </th>
                                    <td> <p className='text-center border-none'>{p.firstName} {p.lastName} </p> </td>

                                    <td> <p className='text-center border-none'>
                                        {p.room} </p>  </td>

                                    <td>
                                        <p className='text-center border-none'>
                                            {p.marker ? p.marker : "-----"}</p> </td>
                                    <td>
                                        <p className='text-center border-none'>
                                            {p.ctPaper ? p.ctPaper : "-----"}
                                        </p>  </td>

                                    <td>
                                        <p className='text-center border-none'>
                                            {p.a4Paper ? p.a4Paper : "-----"}
                                        </p>  </td>

                                    <td>
                                        <p className='text-center border-none'>
                                            {p.pin ? p.pin : "-----"}
                                        </p></td>

                                    <td> <p className='text-center border-none'>
                                        {p.selectedOptions.length > 0 ? p.selectedOptions.map(sel => <p>  {sel}   </p>) : "-----"}</p> </td>

                                    <td><button class="btn btn-solid-success"
                                        onClick={() => { handleDeliver(p._id) }}
                                    > Deliver to {p.firstName} {p.lastName} </button></td>
                                </tr>

                            )
                        }


                    </tbody>
                </table>
            </div>

        </div>


    );
};

export default MaterialPending;