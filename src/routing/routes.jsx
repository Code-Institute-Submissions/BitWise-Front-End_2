import {createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";


const router = createBrowserRouter([

    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,

        children: [
            {path: '', element: <HomePage /> },
            {path: 'login/', element: <LoginPage /> },
            {path: 'register/', element: <RegisterPage /> },
        ]
    }
])

export default router;
