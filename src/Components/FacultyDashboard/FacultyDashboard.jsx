import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const FacultyDashboard = ({ faculty }) => {
    const [course, setCourse] = useState(null);
    const fullName = faculty.firstName + " " + faculty.lastName;
    // console.log(fullName);

    useEffect(() => {
        fetch(`http://localhost:5000/getCourse/${fullName}`)
            .then(res => res.json())
            .then(data => setCourse(data))
    }, [])



    // console.log(course);

    return (
        <div>
            <div className="card max-w-full mt-6 px-6">
                <div className="card-body flex-row justify-between">
                    <h2 className="card-header">
                        {faculty?.firstName} {faculty?.lastName}
                    </h2>
                    <h1> {faculty.room} </h1>
                    <p className='flex gap-3 items-center'>
                        <span className='font-bold'> Current Status : </span>

                        <span>
                            {faculty.status === "Free Now" ? <input type="radio" className="radio-success radio tooltip tooltip-top"
                                data-tooltip="Free Now" defaultChecked /> : faculty.status === "Busy Now" ? <input type="radio" className="radio-warning radio tooltip tooltip-top" data-tooltip="Busy Now" defaultChecked /> : faculty.status === 'In Leave' ? <button className="btn btn-circle tooltip tooltip-top" data-tooltip="In Leave">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                    : <input type="radio" className="radio-success radio" defaultChecked />}

                        </span>

                    </p>

                </div>
            </div>

            <div className='card max-w-full my-4 px-6 py-3 flex-row items-center justify-center gap-8 mt-6'>

                <h1 className='text-lg font-bold'> Your Running Courses </h1>
            </div>

            <div>
                {
                    course?.map(c =>
                        <div className='card relative px-6 py-6 my-8 mx-6 mt-12 flex-row justify-around
                        items-center max-w-[97%]'>
                            <p className='text-[#F06517]'>{c.courseCode}</p>
                            <p>{c.courseTitle}</p>
                            <p className='text-[#F06517]'>{c.section}</p>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default FacultyDashboard;