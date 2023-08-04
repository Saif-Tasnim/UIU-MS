import React from 'react';
import useStudent from '../../../../hooks/useStudent';
import dummyPic from '../../../../assets/admin/manageUser/h5gnz1ji36o61.webp';

const StudentInfo = () => {
    const [students, refetch] = useStudent();

    return (
        <div>
            <h2 className='text-center font-bold mt-4'> Student Information </h2>

            {/* table data */}

            <div className="flex w-full overflow-x-auto mt-5">
                <table className="table-hover table mx-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Image </th>
                            <th> Id </th>
                            <th> Name </th>
                            <th> Batch </th>
                            <th> Email </th>
                            <th> Phone </th>
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
                                    <td> <button> Make Alumni </button> </td>
                                    <td> <button> Delete </button> </td>
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