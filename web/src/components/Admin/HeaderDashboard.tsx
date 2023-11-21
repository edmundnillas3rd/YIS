import { useState } from "react";
import { Link } from "react-router-dom";

export default function HeaderDashboard() {
    const [currentIndex, setIndex] = useState(0);

    return <section className="flex flex-row gap-1">
        <Link onClick={e => setIndex(1)} className={`${currentIndex === 1 ? "underline" : ""} p-2`} to="/admin/admin-register">Register New Admin</Link>
        <Link onClick={e => setIndex(2)} className={`${currentIndex === 2 ? "underline" : ""} p-2`} to="/admin/admin-manage">Manage Existing Admins</Link>
        <Link onClick={e => setIndex(3)} className={`${currentIndex === 3 ? "underline" : ""} p-2`} to="/admin/admin-configure">Manage System Configurations</Link>
        <Link onClick={e => setIndex(4)} className={`${currentIndex === 4 ? "underline" : ""} p-2`} to="/admin/student-manage">Manage Students</Link>
    </section>;
}