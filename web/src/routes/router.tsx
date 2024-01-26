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
import YearbookPreview from "../pages/YearbookPreview";
import Settings from "../layouts/Settings";
import { UploadFile } from "../components/Admin/";
import Student from "../components/Admin/Student";
import Staff from "../components/Admin/Staff";
import Department from "../components/Admin/Department";
import Course from "../components/Admin/Course";
import Download from "../components/Admin/Download";

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
                path: "yearbook-preview",
                element: <YearbookPreview />
            },
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
                element: <YearbookReleased />
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
    },
    {
        path: "/admin",
        element: <Layout />,
        children: [
            {
                path: "settings",
                element: <Settings />,
                children: [
                    {
                        index: true,
                        element: <UploadFile />
                    },
                    {
                        path: "manage-students",
                        element: <Student />
                    },
                    {
                        path: "manage-staff",
                        element: <Staff />
                    },
                    {
                        path: "manage-departments",
                        element: <Department />
                    },
                    {
                        path: "manage-courses",
                        element: <Course />
                    },
                    {
                        path: "download-files",
                        element: <Download />
                    }
                ]
            }
        ]
    }
]);

export default router;