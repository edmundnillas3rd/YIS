import { SyntheticEvent, useState } from "react";
import { Button, Container, Input } from "../Globals";

export default function () {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            email,
            password
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/update-admin-info`, {
            method: "POST",

            body: JSON.stringify(data)
        });
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

                    <Input
                        title="EMAIL"
                        id="email"
                        pattern={"\w{3,45}@admin.com"}
                        required
                    />
                    <Input
                        title="PASSWORD"
                        id="password"
                        required
                    />
                    <section className="mt-5"><Button>Submit</Button></section>
                </section>
            </form>
        </Container>
    );
}