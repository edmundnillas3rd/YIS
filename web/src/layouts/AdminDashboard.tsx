import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { Navbar, Footer } from "../components/Globals";

export default function AdminDashboard() {
    return (
        // <AuthProvider>
        <>
            <Navbar />
            <main className="flex flex-auto flex-row gap-5 pt-2 justify-start items-center">
                <Outlet />
            </main>
            <Footer />
        </>
        // </AuthProvider>
    );
}