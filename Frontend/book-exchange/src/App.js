import React, { useState } from 'react';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { Home } from './Home';
import Profile from './Profile'; // Import the Profile component
import {BookDetailsPage, loadBookDetails} from './Bookdetails';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/profile",
      element: <Profile/>
    },
    {
      path: "/book/:bookId",
      element: <BookDetailsPage/>,
      loader: loadBookDetails
    }
  ]);

  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
