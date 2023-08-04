import React from 'react';
import useStudent from '../../../../hooks/useStudent';
import dummyPic from '../../../../assets/admin/manageUser/h5gnz1ji36o61.webp';
import { GrUpdate } from 'react-icons/gr'
import { BsTrash } from 'react-icons/bs'
import { LiaUserGraduateSolid } from 'react-icons/lia'

const StudentInfo = () => {
    const [students, refetch, dataLoading] = useStudent();


    if (dataLoading) {
        return <div className="skeleton h-24"></div>
    }


    return (
        <div>
            <div className='flex items-center mt-10 mx-5'>
                <input type="text" name="" id="" placeholder='Search by Id' className='p-2 border-2 rounded-lg ' />
                <h2 className='text-center ml-36 font-bold'> Student Information </h2>

            </div>

            {/* table data */}

            <div className="flex w-full overflow-x-auto overflow-y-auto mt-10">
                <table className="table-hover table mx-4">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Image </th>
                            <th> Id </th>
                            <th> Name </th>
                            <th> Batch </th>
                            <th> Email </th>
                            <th> Phone </th>
                            <th> Action </th>
                            <th> Action </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            students.map((stu, index) =>

                                <tr>
                                    <th> {index + 1} </th>
                                    <td>
                                        <div className='avatar border-none'>
                                            <img src={stu.image ? stu.image : dummyPic} alt="" />
                                        </div>
                                    </td>
                                    <td> {stu.studentId} </td>
                                    <td> {stu.firstName + " " + stu.lastName} </td>
                                    <td> {stu.batchId} </td>
                                    <td> {stu.email} </td>
                                    <td> {stu.phone} </td>
                                    <td className='tooltip' data-tooltip="Make Alumni"> <button className='btn bg-[#f38343] text-xl ml-3'> <LiaUserGraduateSolid></LiaUserGraduateSolid> </button> </td>

                                    <td className='tooltip' data-tooltip="Update Data"> <button className='btn bg-yellow-500'> <GrUpdate></GrUpdate> </button> </td>

                                    <td className='tooltip' data-tooltip="Delete Data"> <button className='btn bg-red-500 text-white'> <BsTrash></BsTrash> </button> </td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default StudentInfo; <h2>Student Information </h2>