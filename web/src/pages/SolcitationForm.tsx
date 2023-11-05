import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SoliciationFormPage() {

    const navigate = useNavigate();

    useEffect(() => {
        const role = import.meta.env.VITE_USER_ROLE;

        if (role !== "admin") {
            navigate("/home");
        }
    }, []);

    return <section></section>;
}