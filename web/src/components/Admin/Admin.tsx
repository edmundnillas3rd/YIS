import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Button, Container, Input, Spinner } from "../Globals";
import { AuthContext } from "../../context/AuthProvider";

export default function () {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    const [currentUser, setCurrentUser] = useContext(AuthContext);

    useEffect(() => {
        if (currentUser)
            setEmail(currentUser['email'])
    }, [currentUser])


    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);

        const data = {
            email,
            password
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/update-admin-info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    };

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "email":
                setEmail(target.value);
                break;
            case "password":
                setPassword(target.value);
                break;
        }

    };

    return (
        <Container>
            <h3 className="font-bold">
                MANAGE ADMIN
            </h3>
            <form method="POST" onSubmit={onSubmitHandler}>
                <section className="flex flex-row items-center gap-1">
                    <section className="flex flex-col gap-1 items-center mt-5">
                        {currentUser && <Input
                            title="EMAIL"
                            id="email"
                            value={email}
                            pattern={"\\w{3,45}@admin.com"}
                            required
                            onChange={onChange}
                        />}
                        <span className="text-xs text-zinc-500 font-bold">(FORMAT: user@admin.com)</span>

                    </section>

                    <Input
                        title="PASSWORD"
                        id="password"
                        onChange={onChange}
                        pattern={`\\w{5,45}`}
                    />
                    <section className="mt-5">
                        <Button>{!loading ?
                            "Submit" : (
                                <Spinner />
                            )
                        }</Button>
                    </section>
                </section>
            </form>
        </Container>
    );
}