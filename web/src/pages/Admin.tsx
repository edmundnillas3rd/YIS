import { Button, Container, Input, Toggle } from "../components/Globals";

export default function() {
    return (
        <Container>
            <Input
                title="First Name"
                id="first-name"
            ></Input>
            <Input
                title="Middle Name"
                id="middle-name"
            ></Input>
            <Input
                title="Last Name"
                id="last-name"
            ></Input>
            <section className="mt-5">
                <Toggle name="Register">
                </Toggle>
            </section>
        </Container>
    )
}