import React from 'react';
import {
    createBrowserRouter,

} from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Pages/HomePages/Home/Home';
import LogIn from '../Pages/EntryPages/LogIn/LogIn';
import SideBar from '../Components/SideBar/SideBar';
import Dashboard from '../Pages/AdminPages/Dashboard/Dashboard';

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
        children:[
            {
                path:"/dashboard/",
                element: <Dashboard></Dashboard>
            }
        ]
    }
])