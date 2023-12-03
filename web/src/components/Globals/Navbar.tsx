import { SyntheticEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

import cjcLogo from "/assets/cjc-logo.png";

export default function Navbar() {
    const [title, setTitle] = useState("");
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onClickHandler = async (e: SyntheticEvent) => {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            method: "POST"
        });
        const { url } = await response.json();
        if (response.ok) {
            navigate(url);
            setLoading(false);
        }
    };

    const parseURL = () => {
        const url = window.location.href;
        const parseUrl = url.split("/");

        for (const arg of parseUrl) {
            switch (arg) {
                case "home":
                    setTitle("Home");
                    setDisplay(false);
                    break;
                case "section":
                    const foundSection = parseUrl.find(s => {
                        return s === "colleges" || s === "solicitation" || s === "yearbook-photos";
                    });

                    if (foundSection !== undefined) {
                        const formattedStr = foundSection.charAt(0).toUpperCase() + foundSection.slice(1);
                        setTitle(formattedStr);
                    }

                    setDisplay(true);
                    break;
                case "colleges":
                    const name = parseUrl[parseUrl.length - 1].toUpperCase();
                    setTitle(name);
                    setDisplay(true);
                    break;
                case "yearbook-photos":
                    setTitle("Yearbook Photos");
                    break;
                case "yearbook-released":
                    setTitle("Yearbook Released");
                    break;
            }
        }
    };

    useEffect(() => {
        parseURL();
    }, [window.location.href]);

    return (
        <nav className="bg-red-600 p-4 flex flex-row items-center">
            <section className="flex flex-row items-center gap-10">
                <NavLink className="hidden md:block" to="/home">
                    <img src={cjcLogo} alt="cjc-logo" className="w-8 h-8 ml-3" />
                </NavLink>
                {display ? (
                    <button className="flex flex-row gap-2 items-center" onClick={e => {
                        e.preventDefault();
                        navigate(-1);
                    }}>
                        <AiOutlineArrowLeft />
                        <p className="text-slate-200 font-bold">{title}</p>
                    </button>
                ) : (
                    <p className="text-slate-200 font-bold">{title}</p>
                )}
            </section>

            <button className="ml-auto" onClick={onClickHandler} disabled={loading} >
                {loading ? (
                    "Loading..."
                ) : (
                    <FiLogOut />
                )}
            </button>
        </nav>
    );
}