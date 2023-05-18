import {createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

import Layout from "../pages/Layout";
import RegisterPage from "../pages/RegisterPage";


const router = createBrowserRouter([

    {
        path: '/',
        element: <Layout />,

        children: [
            {path: '', element: <HomePage /> },
            {path: 'login/', element: <LoginPage /> },
            {path: 'register/', element: <RegisterPage /> },
        ]
    }
])

export default router;
