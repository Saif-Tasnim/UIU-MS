import React, { useEffect, useState } from 'react';
import UserCommonHeader from '../UserCommonHeader/UserCommonHeader';
import useCheckStudent from '../../hooks/useCheckStudent';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const SearchCourse = () => {
    const [input, setInput] = useState();
    const [allCourse, setAllCourse] = useState([]);
    const [student] = useCheckStudent();
    const [axiosSecure] = useAxiosSecure();
    const [state, setState] = useState(false);

    const { data: enrolled = [], refetch } = useQuery({
        queryKey: ['enrolled'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrollCourse/${student.email}`)
            return res.data;
        }
    })

    useEffect(() => {
        fetch(`http://localhost:5000/courseList/${input}`)
            .then(res => res.json())
            .then(data => setAllCourse(data))
        refetch();
    }, [allCourse])

    if (input === "") {
        setInput();
    }

    const handleSearch = input => {
        // console.log(input)
        fetch(`http://localhost:5000/courseList/${input}`)
            .then(res => res.json())
            .then(data => setAllCourse(data))

    }


    const handleEnrollBtn = (course) => {
        // console.log(course, student)
        const { courseCode, courseTitle, section, faculty } = course;
        const { firstName, lastName, email, phone, gender, department } = student;

        const enrollData = { courseCode, courseTitle, section, faculty, firstName, lastName, email, phone, gender, department };

        // console.log(enrollData);

        axiosSecure.post('http://localhost:5000/enrollCourse', enrollData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire(
                        'Good job!',
                        'You enrolled to the course successfully!',
                        'success'
                    )
                }
            })
    }

    return (
        <div>
            <UserCommonHeader></UserCommonHeader>

            <input className="input-ghost-warning input mt-16 my-6 mx-6" placeholder="Search Course by course code"
                onChange={(e) => setInput(e.target.value)}
            />

            <button className="btn btn-outline-warning"
                onClick={() => handleSearch(input)}
            > Search </button>

            <div className='mt-12 mx-5 grid grid-cols-3 gap-5 rounded-lg'>
                {
                    allCourse.map((course, index) =>
                        <div key={index} className="card">
                            <div className="card-body">
                                <h2 className="card-header">{course.courseTitle}</h2>
                                <p className="text-content2"> Course Code : {course.courseCode} </p>
                                <p className="text-content2"> Section: {course.section} </p>
                                <p className="text-content2"> Faculty : {course.faculty} </p>
                                {/* {
                                    enrolled.map((e, index) =>
                                        e.courseCode === course.courseCode && e.section === course.section ?

                                            <div key={index} className="card-footer">
                                                <button className="btn mt-6 bg-[#F06517] text-white"
                                                    disabled
                                                    onClick={() => handleEnrollBtn(course)}
                                                > Enroll Now </button>
                                            </div>
                                            : ""
                                    )
                                } */}

                                {
                                     enrolled.some(e => e.courseCode === course.courseCode && e.section === course.section) ?
                                        <div key={index} className="card-footer">
                                            <button className="btn mt-6 bg-[#F06517] text-white"
                                                disabled
                                                
                                            > Already Enrolled </button>
                                        </div>

                                        : <div className="card-footer">
                                            <button className="btn mt-6 bg-[#F06517] text-white"
                                                onClick={() => handleEnrollBtn(course)}
                                            > Enroll Now </button>
                                        </div>

                                }



                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default SearchCourse;