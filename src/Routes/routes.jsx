import React from 'react';
import {
    createBrowserRouter,

} from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Pages/HomePages/Home/Home';
import LogIn from '../Pages/EntryPages/LogIn/LogIn';
import SideBar from '../Components/SideBar/SideBar';
import Dashboard from '../Pages/AdminPages/Dashboard/Dashboard';
import AddStudent from '../Pages/AdminPages/AddStudent/AddStudent';
import AddFaculty from '../Pages/AdminPages/AddFaculty/AddFaculty';
import AddStaff from '../Pages/AdminPages/AddStaff/AddStaff';
import Teams from '../Pages/AdminPages/Teams/Teams';
import ManageUser from '../Pages/AdminPages/ManageUsers/ManageUser';
import UserNav from '../Components/UserNav/UserNav';
import CounsellingRequest from '../Pages/StudentPage/Counselling/CounsellingRequest';
import CounsellingPage from '../Pages/FacultyPage/CounsellingPage/CounsellingPage';
import AssignCourse from '../Pages/AdminPages/AssignCourse/AssignCourse';
import UserDashboard from '../Components/UserDashboard/UserDashboard';
import SearchCourse from '../Components/SearchCourse/SearchCourse';
import CounsellingUpdate from '../Pages/FacultyPage/CounsellingUpdate/CounsellingUpdate';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    },

    {
        path: 'login',
        element: <LogIn></LogIn>
    },

    // admin routes 
    {
        path: 'dashboard',
        element: <SideBar></SideBar>,
        children: [
            {
                path: "/dashboard/dashsite",
                element: <Dashboard></Dashboard>
            },
            {
                path: 'addStudent',
                element: <AddStudent></AddStudent>
            },
            {
                path: 'addFaculty',
                element: <AddFaculty></AddFaculty>
            },
            {
                path: 'addStaff',
                element: <AddStaff></AddStaff>
            },
            {
                path: 'teams',
                element: <Teams></Teams>
            },
            {
                path: 'assignCourse',
                element: <AssignCourse></AssignCourse>
            },
            {
                path: 'manageUsers',
                element: <ManageUser></ManageUser>
            }
        ]

    },

    {
        path: 'user-dash',
        element: <UserNav></UserNav>,
        children: [
            {
                path: 'dashboard',
                element: <UserDashboard></UserDashboard>
            },

            // student routes ---||||-----

            {
                path: 'searchCourse',
                element: <SearchCourse></SearchCourse>
            },
            {
                path: 'studentCounsellingPage',
                element: <CounsellingRequest></CounsellingRequest>
            },

            //faculty routes

            {
                path: 'facultyCounselling',
                element: <CounsellingPage></CounsellingPage>
            },

            {
                path: 'counsellingUpdate',
                element: <CounsellingUpdate></CounsellingUpdate>
            }
        ]
    }


])



/* 

import React from 'react';
import UserCommonHeader from '../../../Components/UserCommonHeader/UserCommonHeader';

const UserDashboard = () => {

    return (
        <div>
            <UserCommonHeader></UserCommonHeader>
              
              
            
        </div>
    );
};

export default UserDashboard;

*/