import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderDashboard() {
    const [currentIndex, setIndex] = useState(1);
    const navigate = useNavigate();

    const routes = [
        "/admin/register",
        "/admin/manage",
        "/admin/sys-config",
        "#"
    ];

    useEffect(() => {
        navigate(routes[currentIndex - 1]);
    }, []);

    return <section className="flex flex-col gap-1 w-1/4 justify-center border-r border-slate-300 h-full">
        <Link onClick={e => setIndex(1)} className={`${currentIndex === 1 ? "font-bold rounded bg-red-600 text-slate-100" : ""} p-2`} to={routes[0]}>Register New Admin</Link>
        <Link onClick={e => setIndex(2)} className={`${currentIndex === 2 ? "font-bold rounded bg-red-600 text-slate-100" : ""} p-2`} to={routes[1]}>Manage Existing Admins</Link>
        <Link onClick={e => setIndex(3)} className={`${currentIndex === 3 ? "font-bold rounded bg-red-600 text-slate-100" : ""} p-2`} to={routes[2]}>Manage System Configurations</Link>
        <Link onClick={e => setIndex(4)} className={`${currentIndex === 4 ? "font-bold rounded bg-red-600 text-slate-100" : ""} p-2`} to={routes[3]}>Manage Students</Link>
    </section>;
}