import React from 'react';
import { Link } from 'react-router-dom';
import { GiNotebook } from 'react-icons/gi';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Note = () => {

    const [axiosSecure] = useAxiosSecure();

    const { data: notes = [] } = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/notes')
            return res.data;
        }
    })
    return (
        <div>
            <div className='my-10 flex justify-center'>
                <Link to='/user-dash/shareNotes'>
                    <button className="btn bg-[#F06517] flex gap-2 text-white">
                        <GiNotebook className='text-2xl' />  <span> Share Your Notes </span> </button>
                </Link>
            </div>

            <div className='card max-w-full mt-10 mb-7 px-6 py-5 flex-row items-center justify-center gap-8'>
                <span className='text-[#F06517] text-lg'> All Notes Here </span>
            </div>

            <div className="flex w-full overflow-x-auto">
                <table className="table-hover table">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Student Name </th>
                            <th> email </th>
                            <th> course </th>
                            <th> course teacher </th>
                            <th> note topic </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            notes.map((nt, index) =>
                                <tr>
                                    <th> {index + 1} </th>
                                    <td> {nt.fullName} </td>
                                    <td>{nt.email}</td>
                                    <td> {nt.course} </td>
                                    <td> {nt.faculty} </td>
                                    <td> {nt.title} </td>
                                    <td> <p className='text-green-600 underline'> download </p> </td>
                                </tr>


                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Note;