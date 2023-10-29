import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Main";
import Auth from "../pages/Auth";
import Main from "../pages/Main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Auth />
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
    }
]);

export default router;