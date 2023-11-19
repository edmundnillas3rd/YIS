import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Main() {
    return (
        <>
            <AuthProvider>
                <Navbar />
                <main className="relative">
                    <Outlet />
                </main>
                <Footer />
            </AuthProvider>
        </>
    );
}