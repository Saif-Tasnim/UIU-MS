import React, { useEffect, useState } from 'react';
import useStudent from '../../../../hooks/useStudent';
import dummyPic from '../../../../assets/admin/manageUser/h5gnz1ji36o61.webp';
import useFaculty from '../../../../hooks/useFaculty';
import { GrUpdate } from 'react-icons/gr'
import { BsTrash } from 'react-icons/bs'
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const facultyInfo = () => {
    const [faculties, refetch, dataLoading] = useFaculty();
    const [axiosSecure] = useAxiosSecure();
    // console.log(faculties);

    const [searchInput, setSearchInput] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(faculties);

    useEffect(() => {
        const filtered = faculties.filter(faculty =>
            faculty.facultyId.includes(searchInput)
        );
        setFilteredStudents(filtered);
    }, [searchInput, faculties]);


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-error'
        },
        buttonsStyling: true
    })

    const handleDeleteBtn = student => {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Delete Faculty`,
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteFaculty/${student._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                `${student.firstName} ${student.lastName} successfully deleted`,
                                'success'
                            )
                        }
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'You have changed your mind :)',
                    'error'
                )
            }
        })
    }


    if (dataLoading) {
        return <div className="skeleton h-24"></div>
    }

    return (
        <div>
            <div className='flex items-center mt-10 mx-5'>
                <input type="text" name="" id="" placeholder='Search by Id' className='p-2 border-2 rounded-lg '
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <h2 className='text-center ml-36 font-bold'> Faculty Information </h2>

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
                            <th> Department </th>
                            <th> Email </th>
                            <th> Phone </th>
                            <th> Action </th>
                            <th> Action </th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            filteredStudents.map((stu, index) =>

                                <tr>
                                    <th> {index + 1} </th>
                                    <td>
                                        <div className='avatar border-none'>
                                            <img src={stu.image ? stu.image : dummyPic} alt="" />
                                        </div>
                                    </td>
                                    <td> {stu.facultyId} </td>
                                    <td> {stu.firstName + " " + stu.lastName} </td>
                                    <td> {stu.designation} </td>
                                    <td> {stu.department} </td>
                                    <td> {stu.email} </td>
                                    <td> {stu.phone} </td>

                                    <td className='tooltip' data-tooltip="Update Data"> <button className='btn bg-yellow-500'
                                    // onClick={()=>handleUpdateBtn(stu)}
                                    > <GrUpdate></GrUpdate> </button> </td>

                                    <td className='tooltip' data-tooltip="Delete Data"> <button className='btn bg-red-500 text-white'
                                        onClick={() => handleDeleteBtn(stu)}
                                    > <BsTrash></BsTrash> </button> </td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default facultyInfo; 