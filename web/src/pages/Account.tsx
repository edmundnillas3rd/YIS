import { useContext, useEffect, useState } from "react";
import { Button, Container } from "../components/Globals";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function () {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errMessage, setErrMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser);

            setEmail(currentUser['email']);
        }
    }, [currentUser]);

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                password
            };

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/update-password`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }



    };

    return (
        <Container>
            <form
                className="flex flex-auto flex-col justify-center items-center"
                onSubmit={onSubmitHandler}
                method="POST">
                <section className="w-1/2">
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        required
                        className="block w-full rounded-t-md border-1 border-gray-300  border-b-gray-50 py-1.5 text-gray-700 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="email"
                        placeholder="Email"
                        disabled={true}
                        onChange={e => {
                            e.preventDefault();
                            setErrMessage("");
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-b-md border-1 border-gray-300  border-t-gray-50 py-1.5 text-gray-700 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Password"
                        onChange={e => {
                            e.preventDefault();
                            setErrMessage("");
                            setPassword(e.target.value);
                        }}
                    />
                </section>
                <section className="mt-4 w-1/2">
                    <Button
                        type="submit"
                        maxWidth={true}
                    >
                        {loading ? "Loading..." : "Update Password"}
                    </Button>
                    {/* <button
                            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            {loading ? "Loading..." : "Sign in"}
                        </button> */}
                </section>
                <div className="mt-2 text-sm">
                    {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
                </div>
            </form>
        </Container>
    );
}