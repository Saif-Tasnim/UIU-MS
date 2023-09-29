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
import ShowAvailableFaculty from '../Pages/StudentPage/ShowAvailableFaculty/ShowAvailableFaculty';
import MaterialRequest from '../Pages/FacultyPage/MaterialRequest/MaterialRequest';
import ShuttleUpdate from '../Pages/FacultyPage/ShuttleUpdate/ShuttleUpdate';
import UpdateShuttle from '../Pages/StaffPages/UpdateShuttle/UpdateShuttle';
import MaterialPending from '../Pages/StaffPages/MaterialPending/MaterialPending';
import ShuttleTime from '../Pages/StudentPage/ShuttleTime/ShuttleTime';
import ErrorElement from '../Pages/ErrorElement/ErrorElement';
import BlogNoteShare from '../Pages/StudentPage/BlogNoteShare/BlogNoteShare';
import StudentBlog from '../Pages/StudentPage/StudentBlog/StudentBlog';
import BlogShare from '../Pages/FacultyPage/BlogShare/BlogShare';
import NoteShare from '../Pages/StudentPage/BlogNoteShare/NoteShare/NoteShare';
import Complain from '../Pages/StaffPages/Complain/Complain';
import Inbox from '../Pages/AdminPages/Inbox/Inbox';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                errorElement: <ErrorElement></ErrorElement>
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
            },
            {
                path: 'inbox',
                element: <Inbox></Inbox>
            }
        ],

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
            {
                path: 'showAvailableFaculty',
                element: <ShowAvailableFaculty></ShowAvailableFaculty>
            },
            {
                path: 'shuttleSchedule',
                element: <ShuttleTime></ShuttleTime>
            },
            {
                path: 'blogNoteShare',
                element: <BlogNoteShare></BlogNoteShare>
            },
            {
                path: 'studentBlog',
                element: <StudentBlog></StudentBlog>
            },
            {
                path: 'shareNotes',
                element: <NoteShare></NoteShare>
            },

            //faculty routes

            {
                path: 'facultyCounselling',
                element: <CounsellingPage></CounsellingPage>
            },

            {
                path: 'counsellingUpdate',
                element: <CounsellingUpdate></CounsellingUpdate>
            },
            {
                path: 'materialRequest',
                element: <MaterialRequest></MaterialRequest>
            },
            {
                path: 'shuttleUpdate',
                element: <ShuttleUpdate></ShuttleUpdate>
            },

            {
                path: 'shareBlog',
                element: <BlogShare></BlogShare>
            },

            // staff routes

            {
                path: 'updateShuttle',
                element: <UpdateShuttle></UpdateShuttle>
            },
            {
                path: 'materialPending',
                element: <MaterialPending></MaterialPending>
            },
            {
                path: 'complainStaff',
                element: <Complain></Complain>
            }

        ]
    }



])
