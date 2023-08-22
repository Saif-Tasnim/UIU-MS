import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = ({ student }) => {
    const [enrollCourse, setEnrollCourse] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/enrollCourse/${student.email}`)
            .then(res => res.json())
            .then(data => setEnrollCourse(data))
    }, [])

    // console.log(enrollCourse);

    return (
        <>
            <div className="card max-w-full mt-6">
                <div className="card-body flex-row justify-between">
                    <h2 className="card-header">
                        {student?.studentId} {student?.firstName} {student?.lastName}
                    </h2>

                    <div className='flex gap-8'>

                        <Link to='/user-dash/searchCourse'
                            className='underline text-orange-600'
                        >
                            Search Course
                        </Link>
                    </div>

                </div>
            </div>

            {
                enrollCourse.length !== 0 ?
                    enrollCourse.map(c =>
                        <div className='card relative px-6 py-6 my-8 mx-6 mt-12 flex-row justify-around
                    items-center max-w-[97%]'>
                            <p className='text-[#F06517]'>{c.courseCode}</p>
                            <p>{c.courseTitle}</p>
                            <p className='text-[#F06517]'>{c.section}</p>
                            <p className='text-[#F06517]'>{c.faculty}</p>
                        </div>
                    )


                    :
                    <div className="card max-w-full mt-20">
                        <div className="card-body flex-row justify-center">
                            <h2>
                                You have not enrolled for any class till now. Go to search & enroll to the course
                            </h2>
                        </div>
                    </div>

            }
        </>
    );
};

export default StudentDashboard;