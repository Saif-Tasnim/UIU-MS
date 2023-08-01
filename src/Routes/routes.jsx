import React from 'react';
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../Pages/HomePages/Home/Home';
import LogIn from '../Pages/EntryPages/LogIn/LogIn';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    },

    {
        path: 'login',
        element: <LogIn></LogIn>
    }
])