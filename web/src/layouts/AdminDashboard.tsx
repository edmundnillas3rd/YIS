import { Outlet } from "react-router-dom";
import HeaderDashboard from "../components/Admin/HeaderDashboard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthProvider";

export default function AdminDashboard() {
    return (
        // <AuthProvider>
        <>
            <Navbar />
            <main className="flex flex-auto flex-row gap-5 pt-2 justify-start items-center">
                <HeaderDashboard />
                <Outlet />
            </main>
            <Footer />
        </>
        // </AuthProvider>
    );
}