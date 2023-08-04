import React from 'react';
import useStudent from '../../../../hooks/useStudent';
import dummyPic from '../../../../assets/admin/manageUser/h5gnz1ji36o61.webp';
import useStaff from '../../../../hooks/useStaff';
import { GrUpdate } from 'react-icons/gr'
import { BsTrash } from 'react-icons/bs'

const StaffInfo = () => {
    const [staffs, refetch] = useStaff();


    return (
        <div>
            <div className='flex items-center mt-10 mx-5'>
                <input type="text" name="" id="" placeholder='Search by Id' className='p-2 border-2 rounded-lg ' />
                <h2 className='text-center ml-36 font-bold'> Staff Information </h2>

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
                            <th> Designation </th>
                            <th> Email </th>
                            <th> Phone </th>
                            <th> Gender </th>
                            <th> Action </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            staffs.map((stu, index) =>

                                <tr>
                                    <th> {index + 1} </th>
                                    <td>
                                        <div className='avatar border-none'>
                                            <img src={stu.image ? stu.image : dummyPic} alt="" />
                                        </div>
                                    </td>
                                    <td> {stu.staffId} </td>
                                    <td> {stu.firstName + " " + stu.lastName} </td>
                                    <td> {stu.designation} </td>
                                    <td> {stu.email} </td>
                                    <td> {stu.phone} </td>
                                    <td> {stu.gender} </td>
                                   
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

export default StaffInfo; 