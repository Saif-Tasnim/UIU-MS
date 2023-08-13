import React, { useEffect, useState } from 'react';
import AdminHeader from '../../../Components/AdminHeader/AdminHeader';
import useFaculty from '../../../hooks/useFaculty';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const AssignCourse = () => {
    const [faculties] = useFaculty();
    const rawSection = ['A', 'B', 'C', 'D', 'E', 'F'];
    const [filteredSection, setFilteredSection] = useState(rawSection);
    const [processing, setProcessing] = useState(false);
    const [axiosSecure] = useAxiosSecure();

    const handleOnSubmit = event => {
        setProcessing(true);

        event.preventDefault();
        const form = event.target;

        const course = form.course.value;
        const section = form.section.value;
        const faculty = form.faculty.value;

        const [courseCode, courseTitle] = course.split('-');

        const data = {
            courseCode, courseTitle, section, faculty
        }

        console.log(data);

        axiosSecure.post('/assignCourse', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire(
                        'Good job!',
                        'Successfully The Course Assigned ! ',
                        'success'
                    )
                    setProcessing(false);
                }

                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This course same section already assigned'
                    })
                    setProcessing(false);
                }
            })
    }


    return (
        <div>
            <AdminHeader></AdminHeader>


            <div className='card max-w-full text-center my-6 py-4 text-[#f38343]'> Assign Course To Faculty
            </div>

            <form action="" className='w-4/5 mx-auto mt-10' onSubmit={handleOnSubmit}>
                <label htmlFor="" className='block mb-4 text-orange-600 font-bold'>
                    Select Course
                </label>

                <select className="select select-ghost-primary" name='course'>
                    <option> CSE 1110-Introduction To Computer Science </option>
                    <option> CSE 1111-Structured Programming Language  </option>
                    <option> CSE 1112-Structured Programming Language Lab </option>
                    <option> CSE 1115-Object Oriented Programming Language  </option>
                    <option> CSE 1116-Object Oriented Programming Language Lab </option>
                    <option> CSE 2118-Advanced Object Oriented Programming Language Lab
                    </option>
                    <option> CSE 2215-Data Structure & Algorithms I </option>
                    <option> CSE 2216-Data Structure & Algorithms I Lab  </option>
                    <option> CSE 2217-Algorithm & Data Structure II </option>
                    <option> CSE 2218-Algorithm & Data Structure II Lab  </option>
                    <option> CSE 3811-Artificial Intelligence </option>
                    <option> CSE 3812-Artificial Intelligence Lab  </option>
                    <option> CSE 3411-System Analysis & Design </option>
                    <option> CSE 3412-System Analysis & Design Lab  </option>
                    <option> CSE 3421-Software Engineering </option>
                    <option> CSE 3422-Software Engineering Lab </option>
                    <option> CSE 4889-Machine Learning </option>
                    <option> EEE 2113-Electrical Circuits </option>
                    <option> EEE 2123-Electronics </option>
                    <option> EEE 2124-Electronics Lab </option>
                    <option> CSE 3313-Computer Architecture </option>
                    <option> CSE 2233-Theory Of Computation </option>
                </select>

                <label htmlFor="" className='block mb-4 text-orange-600 font-bold mt-6'>
                    Select Section
                </label>
                <select className="select select-ghost-primary" name='section'>
                    {
                        filteredSection.map(sec =>
                            <option> {sec} </option>)
                    }

                </select>

                <label className='block mb-4 text-orange-600 font-bold mt-6'> Choose Faculty </label>
                <select className="select select-ghost-primary" name='faculty'>
                    {
                        faculties.map(f =>
                            <option key={f._id}>
                                {f.firstName} {f.lastName}
                            </option>
                        )
                    }
                </select>


                <div className="mt-10">
                    <button type="submit" className="rounded-lg btn bg-[#F06517] 
                        text-white btn-block"> {processing ? <TbFidgetSpinner className='text-3xl animate-spin text-white' /> : "Finalize The Course"} </button>
                </div>

            </form>

        </div>
    );
};

export default AssignCourse;