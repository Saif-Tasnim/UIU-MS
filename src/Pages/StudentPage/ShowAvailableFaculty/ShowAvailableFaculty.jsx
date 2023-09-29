import React, { useEffect, useState } from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import availableImg from '../../../assets/Common/Clock.gif';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ShowAvailableFaculty = () => {
    const [axiosSecure] = useAxiosSecure();
    const [facultyData, setFacultyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosSecure.get('/faculty');
            setFacultyData(res.data);
        };

        fetchData();
    }, []);


    return (

        <div>
            <UserCommonHeader></UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={availableImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Faculty Status </h1>
            </div>

            <div className="flex w-full overflow-x-auto my-12 mx-4">
                <table className="table-hover table">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Room No </th>
                            <th> Designation </th>
                            <th> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            facultyData.map((faculty, index) =>
                                <tr key={faculty._id}>
                                    <td> {index + 1} </td>
                                    <td> {faculty.firstName} {faculty.lastName} </td>
                                    <td> {faculty.email} </td>
                                    <td> {faculty.room} </td>
                                    <td> {faculty.designation} </td>
                                    <td> <p className={`${faculty.status === "In Leave" ? 'text-red-500 font-bold' : faculty.status === "Busy Now" ? 'text-amber-500 font-bold' : 'text-green-500 font-bold'}`}> {faculty.status ? faculty.status : "Free Now"}</p> </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ShowAvailableFaculty;