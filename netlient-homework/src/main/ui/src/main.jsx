import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/HomePage.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import DataListPage from "./pages/DataListPage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/data",
        element: <DataListPage/>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
