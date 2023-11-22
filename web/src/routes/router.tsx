import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Main";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Colleges from "../pages/Colleges";
import StudentInformation from "../pages/StudentInformation";
import ErrorPage from "../pages/Error";
import SoliciationFormPage from "../pages/SolcitationForm";
import YearbookPhotos from "../pages/YearbookPhotos";
import AdminDashboard from "../layouts/AdminDashboard";
import YearbookReleased from "../pages/YearbookRelease";

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
            {
                path: "solicitation",
                element: <SoliciationFormPage />
            },
            {
                path: "yearbook-photos",
                element: <YearbookPhotos />
            },
            {
                path: "yearbook-released",
                element: <YearbookReleased />
            }
        ]
    },
    {
        path: "/division",
        element: <Layout />,
        children: [
            {
                path: ":college_division",
                element: <StudentInformation />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminDashboard />,
        children: [
            {
                index: true,
                element: <></>,
            }
        ]
    }
]);

export default router;