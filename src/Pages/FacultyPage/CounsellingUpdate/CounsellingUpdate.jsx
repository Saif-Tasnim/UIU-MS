import React, { useEffect, useState } from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import useFacultyCheck from '../../../hooks/useFacultyCheck';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const CounsellingUpdate = () => {
    // const [schedule, setSchedule] = useState([]);
    const [faculty] = useFacultyCheck();
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        fetch(`http://localhost:5000/counsellingScheduleFaculty/${faculty.email}`)
            .then(res => res.json())
            .then(data => setSchedule(data))
    }, [])

    const { data: schedule = [], refetch } = useQuery({
        queryKey: ['schedule'],
        queryFn: async () => {
            const res = await axiosSecure.get(`counsellingScheduleFaculty/${faculty.email}`);
            return res.data;
        }
    })


    const handleDelete = async (id) => {
        // console.log(id);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`counsellingDelete/${id}`)
                if (res.data.deletedCount > 0) {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    refetch();
                }


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }



    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;

        const day = form.day.value;
        const startTime = form.startTime.value;
        const endTime = form.endTime.value;

        const { facultyId, email, firstName, lastName } = faculty;
        const fullName = firstName + " " + lastName;

        if (startTime && endTime) {
            const formattedStartTime = new Date(`2000-01-01T${startTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

            const formattedEndTime = new Date(`2000-01-01T${endTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

            // console.log(day, formattedStartTime, formattedEndTime);
            const data = { day, formattedStartTime, formattedEndTime, facultyId, email, fullName }

            // console.log(data)

            axiosSecure.post("/counsellingSchedule", data)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire(
                            'Good job!',
                            'Successfully Schedule Added ! ',
                            'success'
                        )

                        refetch();
                    }
                })
        }

        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Time is invalid',
            })
        }


    }



    return (
        <div>
            <UserCommonHeader></UserCommonHeader>

            <div className="card my-7 max-w-full">
                <div className="card-body text-center text-[#F06517] p-4"> Add / Update  Schedule </div>
            </div>

            <div className='my-7 mx-7'>
                <h1 className='text-center font-bold text-2xl my-6'> Your Current Schedule </h1>

                <div className="flex w-full overflow-x-auto">
                    <table className="table-hover table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th> Day </th>
                                <th> Start Time </th>
                                <th> End time </th>
                                {/* <th> Action</th> */}
                                <th> Action </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                schedule.length > 0 ?
                                    schedule.map((sc, index) =>
                                        <tr>
                                            <th> {index + 1} </th>
                                            <td> {sc.day} </td>
                                            <td> {sc.formattedStartTime} </td>
                                            <td> {sc.formattedEndTime} </td>
                                            {/* <td> <button class="btn btn-solid-success"> Update</button> </td> */}
                                            <td> <button class="btn btn-solid-error" onClick={() => handleDelete(sc._id)}> Delete </button> </td>
                                        </tr>
                                    )
                                    :
                                    <h1 className='text-center text-2xl pl-36'> nothing found in database</h1>
                            }

                        </tbody>
                    </table>
                </div>

            </div>

            <form onSubmit={handleSubmit}>

                <div className='my-10 mx-10'>
                    <h1 className='mb-2'> Choose Day </h1>
                    <select class="select select-ghost-warning" name='day'>
                        <option> Saturday </option>
                        <option> Sunday </option>
                        <option> Tuesday </option>
                        <option> Wednesday </option>
                    </select>
                </div>

                <div className='my-10 mx-10 flex gap-20 items-center'>
                    <div>
                        <h1> Start Time </h1>
                        <input type='time' className="input-ghost-secondary input" placeholder="Secondary" name='startTime' />
                    </div>

                    <div>
                        <h1> End Time </h1>
                        <input type='time' className="input-ghost-secondary input" placeholder="Secondary" name='endTime' />
                    </div>

                    <div className='mt-8'>
                        <button type='submit' class="btn btn-solid-success"> Add To Schedule </button>
                    </div>
                </div>

            </form>



        </div>
    );
};

export default CounsellingUpdate;