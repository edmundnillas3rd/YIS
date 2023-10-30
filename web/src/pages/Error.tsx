import { NavLink, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return (
        <section className="error-page flex flex-col justify-center items-center h-screen">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="mt-5">Either the developer has yet to create this part of the page or you input an invalid address.</p>
            <p>Consult Nicki Pecision for additional information</p>
            <p className="mt-5">
                <i>Error Message: {error.statusText || error.message}</i>
            </p>
            <NavLink className="font-bold" to="/home" replace>Click this link to return home</NavLink>
        </section>
    );
}