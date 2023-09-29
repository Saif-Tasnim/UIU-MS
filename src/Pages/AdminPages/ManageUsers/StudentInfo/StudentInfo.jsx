import React, { useEffect, useState } from 'react';
import useStudent from '../../../../hooks/useStudent';
import dummyPic from '../../../../assets/admin/manageUser/h5gnz1ji36o61.webp';
import { GrUpdate } from 'react-icons/gr'
import { BsTrash } from 'react-icons/bs'
import { LiaUserGraduateSolid } from 'react-icons/lia'
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';


const StudentInfo = () => {
    const [students, refetch, dataLoading] = useStudent();
    const [axiosSecure] = useAxiosSecure();
    const [modalData, setModalData] = useState();
    const [did, setId] = useState("");
    let departmentId;

    // const [students, refetch, dataLoading] = useStudent();
    // const [axiosSecure] = useAxiosSecure();
    // const [modalData, setModalData] = useState();
    // const [did, setId] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(students);

    useEffect(() => {
        const filtered = students.filter(student =>
            student.studentId.includes(searchInput)
        );
        setFilteredStudents(filtered);
    }, [searchInput, students]);


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-error'
        },
        buttonsStyling: true
    })


    if (dataLoading) {
        return <div className="skeleton h-24"></div>
    }

    const handleAlumniBtn = student => {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Make Alumni!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/updateAlumni/${student._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            swalWithBootstrapButtons.fire(
                                'Updated!',
                                `${student.firstName} ${student.lastName} has became Alumni`,
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

    const setData = student => {
        setModalData(student);
        const id = student.studentId;
        departmentId = id.substring(0, 3);
        // console.log(typeof departmentId)
        setId(departmentId);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const gender = form.gender.value;
        const department = form.department?.value || "IT";

        // console.log(firstName, lastName, email, phone, gender, department)

        const modifyData = { firstName, lastName, email, phone, gender, department };

        axiosSecure.put(`/updateInfo/${modalData._id}`, modifyData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    swalWithBootstrapButtons.fire(
                        'Updated!',
                        `data successfully updated`,
                        'success'
                    )
                }

                else{
                    swalWithBootstrapButtons.fire(
                        'No Change!',
                        `You have not changed anything`,
                        'success'
                    )
                }
            })
    }

    const handleDelete = student => {

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Delete ${student.studentId}`,
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteStudent/${student._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                `${student.studentId} has deleted`,
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



    return (
        <div>
            <div className='flex items-center mt-10 mx-5'>
            
            <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Search by Id'
                    className='p-2 border-2 rounded-lg '
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

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
                            filteredStudents.map((stu, index) =>

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

                                    {/* make alumni button */}
                                    <td className='tooltip' data-tooltip="Make Alumni"> <button className='btn bg-[#f38343] text-xl ml-3' onClick={() => handleAlumniBtn(stu)}> <LiaUserGraduateSolid></LiaUserGraduateSolid> </button> </td>

                                    {/* update data button */}
                                    <td className='tooltip' data-tooltip="Update Data"> <label className='btn bg-yellow-500'
                                        for="modal-3"
                                        onClick={() => setData(stu)}> <GrUpdate></GrUpdate> </label> </td>

                                    {/* delete data button */}
                                    <td className='tooltip' data-tooltip="Delete Data"> <button className='btn bg-red-500 text-white'
                                        onClick={() => handleDelete(stu)}
                                    > <BsTrash></BsTrash> </button> </td>


                                    {/* modal data for update */}

                                    <input className="modal-state" id="modal-3" type="checkbox" />
                                    <div className="modal">
                                        <label className="modal-overlay"></label>
                                        <div className="modal-content max-w-2xl w-full flex flex-col gap-5 -translate-y-full duration-700 ease-in-out">

                                            <label for="modal-3" className="btn btn-md btn-circle absolute right-2 top-2 btn-error">✕</label>
                                            <h2 className="text-xl text-center font-bold my-4"> Update Student Info </h2>

                                            <form onSubmit={handleSubmit}>

                                                <div className='flex gap-6 my-6'>
                                                    <input className="input input-solid" defaultValue={modalData?.firstName}
                                                        name='firstName'
                                                    />

                                                    <input className="input input-solid" defaultValue={modalData?.lastName}
                                                        name='lastName'
                                                    />
                                                </div>

                                                <div className='flex gap-6 my-6'>
                                                    <input className="input input-solid" defaultValue={modalData?.email}
                                                        name='email'
                                                    />

                                                    <input className="input input-solid" defaultValue={modalData?.phone}
                                                        name='phone'
                                                    />
                                                </div>

                                                <div className='flex gap-6 my-6'>
                                                    <input className="input input-solid" defaultValue={modalData?.gender}
                                                        name='gender'
                                                    />

                                                    {
                                                        did === '011' &&
                                                        <input className="input input-solid" defaultValue="CSE"
                                                            name='department'
                                                        />}
                                                </div>

                                                <div className="flex gap-3">
                                                    <button className="btn btn-success btn-block"> Update Info </button>
                                                </div>

                                            </form>


                                        </div>
                                    </div>
                                </tr>



                            )
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default StudentInfo;


/* 

<label className="btn btn-primary" for="modal-3">Open Modal</label>

<input className="modal-state" id="modal-3" type="checkbox" />
<div className="modal">
    <label className="modal-overlay"></label>
    <div className="modal-content flex flex-col gap-5">
        <label for="modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
        <h2 className="text-xl">Modal title 3</h2>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolorum voluptate ratione dicta. Maxime cupiditate, est commodi consectetur earum iure, optio, obcaecati in nulla saepe maiores nobis iste quasi alias!</span>
        <div className="flex gap-3">
            <button className="btn btn-error btn-block">Delete</button>
            <button className="btn btn-block">Cancel</button>
        </div>
    </div>
</div>


*/