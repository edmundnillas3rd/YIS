import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { Navbar, Footer } from "../components/Globals";

export default function Main() {
    return (
        <>
            <AuthProvider>
                <Navbar />
                <main className="flex flex-auto relative">
                    <Outlet />
                </main>
                <Footer />
            </AuthProvider>
        </>
    );
}