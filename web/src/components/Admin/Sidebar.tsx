import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function () {

    const [currentIndex, setCurrentIndex] = useState<Number>();

    return (
        <section className="flex flex-col gap-1 p-1">
            <Link
                to="/admin/settings" replace
                className={`flex justify-center items-center font-bold p-5 rounded hover:cursor-pointer ${currentIndex === 0 ? 'bg-red-600 text-zinc-100' : ''}`}
                onClick={e => setCurrentIndex(0)}
            >
                MANAGE SOLI FILES
            </Link>
            <Link
                to="/admin/settings/manage-students" replace
                className={`flex justify-center items-center font-bold p-5 rounded hover:cursor-pointer ${currentIndex === 1 ? 'bg-red-600 text-zinc-100' : ''}`}
                onClick={e => setCurrentIndex(1)}
            >
                MANAGE STUDENTS
            </Link>
            <Link
                to="/admin/settings/manage-staff" replace
                className={`flex justify-center items-center font-bold p-5 rounded hover:cursor-pointer ${currentIndex === 2 ? 'bg-red-600 text-zinc-100' : ''}`}
                onClick={e => setCurrentIndex(2)}
            >
                MANAGE STAFF
            </Link>
            <Link 
                to="/admin/settings/manage-departments"
                className={`flex justify-center items-center font-bold p-5 rounded hover:cursor-pointer ${currentIndex === 3 ? 'bg-red-600 text-zinc-100' : ''}`}
                onClick={e => setCurrentIndex(3)}
            >
                MANAGE COLLEGE DEPARTMENTS
            </Link>
            <Link 
                to="/admin/settings/manage-courses"
                className={`flex justify-center items-center font-bold p-5 rounded hover:cursor-pointer ${currentIndex === 4 ? 'bg-red-600 text-zinc-100' : ''}`}
                onClick={e => setCurrentIndex(4)}
            >
                MANAGE COLLEGE COURSES
            </Link>
        </section>
    );
}
