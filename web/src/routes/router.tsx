import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";
import Auth from "../pages/Auth";
import Main from "../pages/Main";
import Colleges from "../pages/Colleges";
import Department from "../pages/Department";
import ErrorPage from "../pages/Error";

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
                element: <Main />
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
            }
        ]
    },
    {
        path: "/division",
        element: <Layout />,
        children: [
            {
                path: ":college_division",
                element: <Department />
            }
        ]
    }
]);

export default router;