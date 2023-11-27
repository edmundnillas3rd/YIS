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
import RegisterAdmin from "../pages/Admin/RegisterAdmin";
import ManageAdmin from "../pages/Admin/ManageAdmin";
import SystemConfig from "../pages/Admin/SystemConfig";
import YearbookStatus from "../pages/YearbookStatus";

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
                path: "yearbook-status",
                element: <YearbookStatus />
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
            },
            {
                path: "register",
                element: <RegisterAdmin />
            },
            {
                path: "manage",
                element: <ManageAdmin />
            },
            {
                path: "sys-config",
                element: <SystemConfig />
            }
        ]
    }
]);

export default router;