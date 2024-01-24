import { NavLink, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return (
        <section className="error-page flex flex-col justify-center items-center h-screen p-10 text-center">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <section className="flex flex-col gap-5 mt-2">
                <p>Either the developer has yet to create this part of the page or you input an invalid address.</p>
                {/* <p>Consult Nicki Pecision for additional information</p> */}
                <p>
                    <i>Error Message: {error.statusText || error.message}</i>
                </p>

            </section>
            <NavLink className="font-bold" to="/home" replace>Click this link to return home</NavLink>
        </section>
    );
}