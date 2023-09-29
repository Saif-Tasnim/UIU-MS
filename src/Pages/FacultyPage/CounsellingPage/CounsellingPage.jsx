import React, { useContext, useEffect, useState } from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import counsellingImg from '../../../assets/Common/counselling.gif';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CounsellingPage = () => {

    const { user } = useContext(AuthContext);
    const [bookingData, setBookingData] = useState([]);
    const [axiosSecure] = useAxiosSecure();
    const [id, setId] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/bookingData/${user?.displayName}`)
            .then(res => res.json())
            .then(data => setBookingData(data));
    }, [])

    // console.log(user?.displayName);

    const handleAcceptBtn = async (id) => {
        // console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to accept this counselling !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Accept it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/counseling/${id}`)
                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        'Accepted!',
                        'This schedule is fixed for you.',
                        'success'
                    )
                }
            }

        })
    }

    const handleRejectBtn = id => {
        setId(id);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (id) {
            const form = event.target;
            const text = form.rejection.value;

            // console.log(id, text);
            const data = { feedback: text };
            const res = await axiosSecure.put(`/updateCounseling/${id}`, data)
            if (res.data.modifiedCount > 0) {
                Swal.fire(
                    'Done!',
                    'Feedback successfully sent',
                    'success'
                )
            }

        }
    }

    return (
        <div>
            <UserCommonHeader></UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={counsellingImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Counselling Request </h1>
            </div>


            <div className="flex w-full overflow-x-auto">
                <table className="table-hover table p-5">
                    <thead>
                        <tr>
                            <th> Student Id </th>
                            <th> <p className='text-center border-none'> Student Email </p>  </th>
                            <th> <p className='text-center border-none'> Course </p> </th>
                            <th> <p className='text-center border-none'> Section </p> </th>

                            <th> <p className='text-center border-none'> Problem Summary </p> </th>

                            <th> <p className='mx-5 border-none'> Date </p> </th>
                            <th> Start Time </th>
                            <th> End Time </th>

                            <th> <p className='text-center border-none'></p> Status </th>
                            <th> Action </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookingData.map(bk =>
                                <tr>
                                    <td> <p className='text-[#F06517]'> {bk.studentId} </p> </td>
                                    <td> {bk.email} </td>
                                    <td> <p className='pl-3'>{bk.title}</p> </td>
                                    <td> <p className='pl-4'>{bk.section}</p> </td>
                                    <td>

                                        <div className="popover">
                                            <label className="popover-trigger my-2 btn bg-[#F06517] text-white" tabIndex="0"> {bk.topic} </label>
                                            <div className="popover-content border-4 border-orange-500 w-[600px] popover-top-center" tabIndex="0">
                                                <div className="popover-arrow"></div>
                                                <div className="p-4 text-sm"> {bk.big} </div>
                                            </div>
                                        </div>

                                    </td>
                                    <td> {bk.selectedDate} </td>
                                    <td> {bk.stime} </td>
                                    <td> {bk.etime} </td>
                                    <td> <p className={bk.status === 'accepted' ? 'text-green-600 font-bold' : bk.status === 'rejected' ? 'text-red-600 font-bold' : ''}>
                                        {bk.status}
                                    </p>
                                    </td>

                                    {bk.status === 'pending' ?
                                        <>
                                            <td> <button class="btn btn-outline-success"
                                                onClick={() => handleAcceptBtn(bk._id)}
                                            > Accept </button></td>

                                            <td> <label class="btn btn-outline-error"
                                                for="modal-1"
                                                onClick={() => handleRejectBtn(bk._id)}
                                            > Reject </label></td>

                                        </>

                                        : ""
                                    }

                                    <input className="modal-state" id="modal-1" type="checkbox" />
                                    <div className="modal">
                                        <label className="modal-overlay" htmlFor="modal-1"></label>
                                        <div className="modal-content max-w-2xl w-full flex flex-col gap-5 -translate-y-full duration-700 ease-in-out">

                                            <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                            <h2 className="text-xl text-center font-bold"> Cause for Rejection </h2>

                                            <form onSubmit={handleSubmit}>
                                                <textarea name="rejection" id="" cols="60" rows="10" placeholder='why are you rejecting this schedule. Please replace the schedule ?' className='p-6 border-2 border-amber-400'
                                                > </textarea>

                                                <div className="flex gap-3">
                                                    <button
                                                        type='submit'
                                                        className="btn bg-[#F06517] btn-block text-white"
                                                    > Send Feedback </button>


                                                </div>

                                            </form>

                                        </div>
                                    </div>

                                </tr>)

                        }

                    </tbody>
                </table>



            </div>



        </div>
    );
};

export default CounsellingPage;

