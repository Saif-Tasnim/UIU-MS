import React, { useEffect, useState } from 'react';

const FacultyDashboard = ({ faculty }) => {
    const [course, setCourse] = useState(null);
    const fullName = faculty.firstName + " " + faculty.lastName;
    console.log(fullName);

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
                    <p> <span className='font-bold'> Current Status </span> : Available Now </p>
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