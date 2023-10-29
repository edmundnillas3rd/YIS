import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import Layout from "../layouts/Main";

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
                element: <div>Home</div>
            }
        ]
    }
]);

export default router;