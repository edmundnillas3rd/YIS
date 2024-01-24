import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../components/Globals";
import { Sidebar } from "../components/Admin";

export default function () {

    const navigate = useNavigate();
    return (
        <section className="flex flex-auto flex-row">
            {/* <section className="flex flex-auto flex-col p-1">
                <Button onClick={() => navigate("")}>
                    Upload File
                </Button>
            </section> */}
            <Sidebar/>
            <section className="flex flex-auto">
                <Outlet />
            </section>
        </section>
    );
}