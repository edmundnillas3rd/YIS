import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Colleges from "../pages/Colleges";
import ErrorPage from "../pages/Error";
import StudentInformation from "../pages/StudentInformation";
import Solicitation from "../pages/Solicitation";
import YearbookPhotos from "../pages/YearbookPhotos";
import YearbookReleased from "../pages/YearbookReleased";

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
                path: "solicitation",
                element: <Solicitation />
            },
            {
                path: "colleges",
                element: <Colleges />,
            },
            {
                path: "yearbook-photos",
                element: <YearbookPhotos />
            },
            {
                path: "yearbook-released",
                element: <YearbookReleased/>
            }

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