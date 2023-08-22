import React, { useState } from 'react';
import UserCommonHeader from '../UserCommonHeader/UserCommonHeader';
import useCheckStudent from '../../hooks/useCheckStudent';
import useFacultyCheck from '../../hooks/useFacultyCheck';
import useCheckStaff from '../../hooks/useCheckStaff';
import StudentDashboard from '../StudentDashboard/StudentDashboard';
import FacultyDashboard from '../FacultyDashboard/FacultyDashboard';


const UserDashboard = () => {
    const [student] = useCheckStudent();
    const [faculty] = useFacultyCheck();
    const [staff] = useCheckStaff();


    return (
        <div>
            <UserCommonHeader></UserCommonHeader>

            {
                student && <StudentDashboard key={student._id} student={student}></StudentDashboard>
            }
            {
                faculty && <FacultyDashboard key={faculty._id} faculty={faculty}></FacultyDashboard>
            }
            {
                staff && "this is staff"
            }
        </div>
    );
};

export default UserDashboard;