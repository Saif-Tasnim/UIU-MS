import React, { useState } from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';
import useCheckStudent from '../../../hooks/useCheckStudent';
import blogImg from '../../../assets/Common/blog.gif';
import { BsFillGearFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import moment from 'moment';
import useFacultyCheck from '../../../hooks/useFacultyCheck';

// moment().format('LL');

const StudentBlog = () => {

    const [student] = useCheckStudent();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const [faculty] = useFacultyCheck();

    const submitDate = moment().format('LL')

    // console.log(submitDate)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;

        const permission = form.ok.value;
        const summary = form.summary.value;
        const details = form.details.value;

        // console.log(permission, summary, details)
        if (student) {
            const { firstName, lastName, email, studentId } = student;
            const savedData = { permission, summary, details, firstName, lastName, email, studentId, criteria: "student", date: submitDate }

            const res = await axiosSecure.post('/postBlog', savedData)
            if (res.data.insertedId) {
                Swal.fire(
                    'Posted!',
                    'Your blog successfully posted!',
                    'success'
                )

                navigate('/user-dash/blogNoteShare');
            }
        }

        if (faculty) {

            const { firstName, lastName, email, facultyId } = faculty;
            const savedData = { permission, summary, details, firstName, lastName, email, facultyId, criteria: "faculty", date: submitDate }

            const res = await axiosSecure.post('/postBlog', savedData)
            if (res.data.insertedId) {
                Swal.fire(
                    'Posted!',
                    'Your blog successfully posted!',
                    'success'
                )

                navigate('/user-dash/blogNoteShare');
            }
        }

    }

    return (

        <div>
            <UserCommonHeader> </UserCommonHeader>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8'>
                <img src={blogImg} className='w-20 rounded-xl' alt="" />
                <h1 className='text-lg font-bold'> Add Your Blogs </h1>
            </div>

            {
                student && <div className='my-10 mx-6 border-2 p-5 rounded-xl'>

                    <form onSubmit={handleSubmit}>

                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-y-8 w-[60%]'>
                                <div className='flex gap-5 items-center'>
                                    <label htmlFor=""> Author Name  : </label>
                                    <input className="input input-solid ml-5" defaultValue={`${student.firstName} ${student.lastName}`}
                                        readOnly
                                    />
                                </div>

                                <div className='flex gap-5 items-center'>
                                    <label htmlFor=""> Author Id  : </label>
                                    <input className="input input-solid ml-14" defaultValue={student.studentId}
                                        readOnly
                                    />
                                </div>

                            </div>

                            <div>
                                <div className="popover mr-16">
                                    <label className="popover-trigger my-2 btn btn-solid-primary tooltip tooltip-hover" data-tooltip="Change Setting" tabIndex="0" >
                                        <BsFillGearFill className="animate-spin text-xl " /> </label>

                                    <div className="popover-content" tabIndex="0">
                                        <div className="popover-arrow"> </div>
                                        <div className="p-4 text-sm">

                                            <p> <input type="radio" className="switch switch-ghost-success"
                                                name='ok'
                                                value="all"
                                                defaultChecked
                                            /> <span className='ml-3'

                                            > View To All </span> </p>

                                            <p className='my-4'> <input type="radio" className="switch switch-ghost-success"
                                                name='ok'
                                                value="student"
                                            /> <span className='ml-3'> View To Student </span> </p>

                                            <p className='my-4'> <input type="radio" className="switch switch-ghost-success"
                                                name='ok'
                                                value="faculty"
                                            /> <span className='ml-3'> View To Faculty
                                                </span> </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='my-14 flex flex-col gap-y-4'>
                            <label htmlFor="" className='text-center font-bold'> Blog Title  </label>
                            <input className="input-ghost-success input block max-w-full" placeholder="Writer Your Blog Topic Here ... " name='summary' />
                        </div>

                        <div className='my-14 flex flex-col gap-y-4'>
                            <label htmlFor="" className='text-center font-bold'> Blog Description  </label>
                            <textarea className="textarea-ghost-success textarea resize-none max-w-full h-[200px]" placeholder="Write Your Blogs Here Elaborately ..." name='details' />
                        </div>

                        <div className='flex gap-5 justify-end mr-8'>
                            <button type='submit' className="btn btn-solid-success"> Save & Upload </button>
                            <button type='reset' className="btn btn-solid-error"> Clear </button>
                        </div>

                    </form>
                </div>
            }


            {
                faculty &&

                <div className='my-10 mx-6 border-2 p-5 rounded-xl'>

                    <form onSubmit={handleSubmit}>

                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-y-8 w-[60%]'>
                                <div className='flex gap-5 items-center'>
                                    <label htmlFor=""> Author Name  : </label>
                                    <input className="input input-solid ml-5" defaultValue={`${faculty.firstName} ${faculty.lastName}`}
                                        readOnly
                                    />
                                </div>

                                <div className='flex gap-5 items-center'>
                                    <label htmlFor=""> Author Id  : </label>
                                    <input className="input input-solid ml-14" defaultValue={faculty.facultyId}
                                        readOnly
                                    />
                                </div>

                            </div>

                            <div>
                                <div className="popover mr-16">
                                    <label className="popover-trigger my-2 btn btn-solid-primary tooltip tooltip-hover" data-tooltip="Change Setting" tabIndex="0" >
                                        <BsFillGearFill className="animate-spin text-xl " /> </label>

                                    <div className="popover-content" tabIndex="0">
                                        <div className="popover-arrow"> </div>
                                        <div className="p-4 text-sm">

                                            <p> <input type="radio" className="switch switch-ghost-success"
                                                name='ok'
                                                value="all"
                                                defaultChecked
                                            /> <span className='ml-3'

                                            > View To All </span> </p>

                                            <p className='my-4'> <input type="radio" className="switch switch-ghost-success"
                                                name='ok'
                                                value="student"
                                            /> <span className='ml-3'> View To Student </span> </p>

                                            <p className='my-4'> <input type="radio" className="switch switch-ghost-success"
                                                name='ok'
                                                value="faculty"
                                            /> <span className='ml-3'> View To Faculty
                                                </span> </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='my-14 flex flex-col gap-y-4'>
                            <label htmlFor="" className='text-center font-bold'> Blog Title  </label>
                            <input className="input-ghost-success input block max-w-full" placeholder="Writer Your Blog Topic Here ... " name='summary' />
                        </div>

                        <div className='my-14 flex flex-col gap-y-4'>
                            <label htmlFor="" className='text-center font-bold'> Blog Description  </label>
                            <textarea className="textarea-ghost-success textarea resize-none max-w-full h-[200px]" placeholder="Write Your Blogs Here Elaborately ..." name='details' />
                        </div>

                        <div className='flex gap-5 justify-end mr-8'>
                            <button type='submit' className="btn btn-solid-success"> Save & Upload </button>
                            <button type='reset' className="btn btn-solid-error"> Clear </button>
                        </div>

                    </form>
                </div>
            }

        </div>
    );
};

export default StudentBlog;