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
                path: 'manageUsers',
                element: <ManageUser></ManageUser>
            }
        ]
    }
])