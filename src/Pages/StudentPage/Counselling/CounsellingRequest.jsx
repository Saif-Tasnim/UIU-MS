import React, { useContext, useEffect, useState } from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import counsellingImg from '../../../assets/Common/counselling.gif';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCheckStudent from '../../../hooks/useCheckStudent';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const CounsellingRequest = () => {
    const { loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [modalData, setModalData] = useState(null);
    const [counselingData, setCounsellingData] = useState([]);
    const [student] = useCheckStudent();
    const [booking, setBooking] = useState([]);
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/counsellingSchedule/${modalData?.faculty}`)
            .then(res => res.json())
            .then(data => setCounsellingData(data))
    }, [counselingData])


    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrollCourse/${student.email}`)
            return res.data;
        }
    })

    const { data: bookingInfo = [] } = useQuery({
        queryKey: ['booking'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/counselingData/${student.email}`)
            return res.data;
        }
    })

    console.log(bookingInfo);


    const handleClickBtn = course => {
        setModalData(course);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const id = form.id.value;
        const email = form.email.value;
        const faculty = form.faculty.value;
        const big = form.big.value;

        const stime = form.stime.value;

        const etime = form.etime.value;
        const selectedDate = form.selectedDate.value;

        console.log(stime)
        console.log(etime);

        const formattedStartTime = new Date(`2000-01-01T${stime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

        const formattedEndTime = new Date(`2000-01-01T${etime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

        // console.log(formattedStartTime ,formattedEndTime )

        const data = {
            studentId: id, email, faculty, big, stime: formattedStartTime, etime: formattedEndTime, selectedDate,
            status: "pending"
        }

        const sameDate = booking.find(bk => bk.selectedDate === selectedDate);
        const stimeExist = booking.find(bk => bk.stime === formattedStartTime);
        const etimeExist = booking.find(bk => bk.etime === formattedEndTime);

        if (sameDate && stimeExist && etimeExist) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This time already booked by others. Please change your time'
            })

            return;
        }

        if (sameDate && (stimeExist || etimeExist)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This time already booked by others. Please change your time'
            })

            return;
        }

        // console.log(data);

        axiosSecure.post('/booking', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire(
                        'Good job!',
                        'Your Appointment is pending ! ',
                        'success'
                    )
                }
            })
    }

    const handleDay = async (time, day) => {
        console.log(time, day);
        const exist = counselingData.find(cd => cd.day === day)
        setFlag(1);

        if (exist) {
            const res = await axiosSecure.get(`/booking?faculty=${modalData.faculty}&time=${time}`)
            console.log(res);
            setBooking(res.data);

        }

        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have chosen a wrong day. Please see the counseling schedule'
            })
        }

    }


    if (typeof classes === 'undefined' || loading) {
        return <div className="skeleton h-24"></div>;
    }

    // console.log(modalData)


    return (

        <div>
            <UserCommonHeader></UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={counsellingImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Counselling Request </h1>
            </div>

            <div>

                {

                    classes.map(course =>

                        <div className='card relative px-6 py-4 my-8 mx-6 mt-12 flex-row
                items-center max-w-[97%]'>

                            <div className='mr-10'>
                                {course.courseCode}
                            </div>

                            <div className='mr-10'>
                                {course.courseTitle}
                            </div>

                            <div className='mr-10'>
                                {course.section}
                            </div>

                            <div className='mr-10'>
                                {course.faculty}
                            </div>

                            <div>
                                {/* <button onClick={() => handleClickBtn(course)} className="btn bg-[#F06517] text-white absolute right-6 top-2" >
                            Need Counselling ?
                        </button> */}

                                {
                                    bookingInfo.find(bk => bk.faculty === course.faculty) ?
                                        bookingInfo.find(bk => bk.faculty === course.faculty).status === "accepted" ?
                                            <div
                                                className=" bg-green-500 text-white absolute right-6 top-2 p-2 rounded-xl text-sm" 

                                            >
                                                {bookingInfo.find(bk => bk.faculty === course.faculty).selectedDate} / {bookingInfo.find(bk => bk.faculty === course.faculty).stime} </div>
                                            :
                                            bookingInfo.find(bk => bk.faculty === course.faculty).status === "rejected" ?
                                                <>
                                                    <div className="popover absolute right-6 -top-0">
                                                        <label className="popover-trigger my-2 btn bg-red-500 text-white
                                                       " tabindex="0"> Rejected </label>
                                                        <div className="popover-content" tabindex="0">
                                                            <div className="popover-arrow"></div>
                                                            <div className="p-4 text-sm">
                                                                {bookingInfo.find(bk => bk.faculty === course.faculty).feedback}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>

                                                :
                                                ""

                                        :
                                        <label
                                            className="btn bg-[#F06517] text-white absolute right-6 top-2" htmlFor="modal-1"
                                            onClick={() => handleClickBtn(course)}
                                        >
                                            Need Counselling </label>

                                }

                                {/* modal data */}
                                <input className="modal-state" id="modal-1" type="checkbox" />

                                <div className="modal max-w-[70%] mx-auto bg-transparent">
                                    <label className="modal-overlay" htmlFor="modal-1"></label>

                                    <div className="modal-content max-w-full w-full flex flex-col gap-5 p-7 bg-gray-100">

                                        <label htmlFor="modal-1" className="btn btn-md btn-error btn-circle absolute right-2 top-2"> ✕ </label>


                                        <div className="flex justify-center">
                                            <h1 className='text-xl font-bold'> Counselling Form </h1>

                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">

                                                <div className='flex gap-8'>

                                                    <div className="form-field">
                                                        <label className="form-label">
                                                            Student Id </label>
                                                        <input
                                                            type="text"
                                                            className="input max-w-full"
                                                            defaultValue={student?.studentId}
                                                            readOnly
                                                            name="id"
                                                        />

                                                    </div>

                                                    <div className="form-field">
                                                        <label className="form-label">
                                                            <span> Email </span>
                                                        </label>
                                                        <div className="form-control">
                                                            <input
                                                                type="email" className="input max-w-full"
                                                                defaultValue={student?.email}
                                                                readOnly
                                                                name='email'
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="form-field">
                                                        <label className="form-label">
                                                            <span> Faculty Name </span>
                                                        </label>

                                                        <div className="form-control">
                                                            <input
                                                                type="text" className="input max-w-full"
                                                                defaultValue={modalData?.faculty}
                                                                readOnly
                                                                name='faculty'
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className='mt-7'>
                                                <h1> Counselling Schedule : </h1>

                                                <div className='mt-5 text-amber-500 border-2 p-3'>
                                                    {
                                                        counselingData.length > 0 ? counselingData.map(coun =>
                                                            <div className='flex gap-20'>
                                                                <p>{coun.day}</p>
                                                                ----------
                                                                <p>{coun.formattedStartTime}
                                                                </p>
                                                                to
                                                                <p>{coun.formattedEndTime
                                                                }</p>

                                                            </div>
                                                        )

                                                            :
                                                            ""
                                                    }

                                                </div>
                                            </div>


                                            <div>
                                                <h1 className='text-center font-bold my-6 mt-10'> Counselling Info </h1>

                                                <textarea name="big" id="" cols="90" rows="10" placeholder='Tell me about your problem.......' className='rounded-lg p-6'>

                                                </textarea>

                                                <h1 className='text-xl font-bold text-center my-6'> Provide your time </h1>


                                                <div>

                                                    <label htmlFor=""> Day : </label>
                                                    <input
                                                        type='date'
                                                        className="input-ghost-secondary input"
                                                        placeholder="Secondary"
                                                        min={`${new Date().toISOString().split('T')[0]}`}
                                                        name="selectedDate"
                                                    />
                                                    <button
                                                        type='button'
                                                        className='btn btn-success ml-9'
                                                        onClick={() => {
                                                            const selectedDate = document.querySelector('input[name="selectedDate"]').value;
                                                            const parsedDate = new Date(selectedDate);
                                                            const dayOfWeek = parsedDate.toLocaleDateString('en-US', { weekday: 'long' });
                                                            handleDay(selectedDate, dayOfWeek);
                                                        }}
                                                    >
                                                        See Available Time
                                                    </button>
                                                </div>

                                                <div className="flex w-full overflow-x-auto mt-6 mb-10">

                                                    <table className="table-zebra table">
                                                        <thead>
                                                            <tr>
                                                                <th> Date </th>
                                                                <th> Start Time </th>
                                                                <th> End Time </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                booking.length > 0 ?
                                                                    booking.map(bo =>
                                                                        <tr>
                                                                            <td> {bo.selectedDate} </td>
                                                                            <td>{bo.stime}</td>
                                                                            <td>{bo.etime}</td>

                                                                        </tr>
                                                                    ) : flag === 1 ?

                                                                        <p className='text-xl text-blue-600 text-center mt-5'> There is no booked schedule. Choose Your Suitable Time </p>

                                                                        : ""
                                                            }

                                                        </tbody>

                                                    </table>
                                                </div>


                                                <div className='py-5 flex flex-row gap-6'>
                                                    <label htmlFor=""> Start Time </label>
                                                    <input type="time" name="stime" id="" />

                                                    <label htmlFor=""> End Time </label>

                                                    <input type="time" name="etime" id="" />

                                                </div>

                                            </div>

                                            <div className='flex justify-center items-center'>
                                                <input type="submit" value="Submit" className='mt-10 btn bg-success' />
                                            </div>

                                        </form>
                                    </div>
                                </div>

                            </div>

                        </div>

                    )
                }

            </div >


            {/* modal form for counselling */}
            {/* <input className="modal-state" id="modal-1" type="checkbox" /> */}

        </div >
    );
};

export default CounsellingRequest;

/* 

<label className="btn btn-primary" htmlFor="modal-1">Open Modal</label>

<input className="modal-state" id="modal-1" type="checkbox" />
<div className="modal">
<label className="modal-overlay" htmlFor="modal-1"></label>
<div className="modal-content flex w-full flex-col gap-5 p-7">
    <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <div className="flex flex-col gap-2">
        <h2 className="text-center text-2xl font-semibold">Sign In</h2>
        <p className="mx-auto max-w-xs text-sm text-content2">Sign in to your account to continue.</p>
    </div>

    <section>
        <div className="form-group">
            <div className="form-field">
                <label className="form-label">Email address</label>
                <input placeholder="Type here" type="email" className="input max-w-full" />
                <label className="form-label">
                    <span className="form-label-alt">Please enter a valid email.</span>
                </label>
            </div>

            <div className="form-field">
                <label className="form-label">
                    <span>Password</span>
                </label>
                <div className="form-control">
                    <input placeholder="Type here" type="password" className="input max-w-full" />
                </div>
            </div>

            <div className="form-field">
                <div className="form-control justify-between">
                    <div>
                        <input type="checkbox" className="checkbox" />
                        <a href="#">Remember me</a>
                    </div>
                    <label className="form-label">
                        <a className="link link-underline-hover link-primary text-sm">Forgot your password?</a>
                    </label>
                </div>
            </div>

            <div className="form-field pt-5">
                <div className="form-control justify-between">
                    <button type="button" className="btn btn-primary w-full">Sign in</button>
                </div>
            </div>
        </div>
        <div className="divider text-sm">Login with social accounts</div>

        <div className="flex justify-center space-x-4">
            <button type="button" aria-label="Log in with Google" className="rounded-sm p-3">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
            c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
            c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
            C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
            c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
            c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                </svg>
            </button>
            <button type="button" aria-label="Log in with Twitter" className="rounded-sm p-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-5 w-5 fill-primary">
                    <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                </svg>
            </button>
            <button type="button" aria-label="Log in with GitHub" className="rounded-sm p-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-5 w-5 fill-current">
                    <path
                        d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"
                    ></path>
                </svg>
            </button>
        </div>
        <div className="items-center justify-center text-xs dark:text-gray-5 sm:px-6 flex gap-2">
            <span>Don't have an account?</span>
            <a rel="noopener noreferrer" href="#" className="link link-primary text-xs">Sign up</a>
        </div>
    </section>
</div>
</div>

*/