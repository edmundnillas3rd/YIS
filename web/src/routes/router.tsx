import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Colleges from "../pages/Colleges";
import ErrorPage from "../pages/Error";
import StudentInformation from "../pages/StudentInformation";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Auth />,
        errorElement: <ErrorPage />
    },
    {
        path: "/home",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            }
        ]
    },
    {
        path: "/section",
        element: <Layout />,
        children: [
            {
                path: "colleges",
                element: <Colleges />,
            },

        ]
    },
    {
        path: "/colleges",
        element: <Layout />,
        children: [
            {
                path: ":college",
                element: <StudentInformation />
            }
        ]
    }
]);

export default router;