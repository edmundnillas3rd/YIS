import { SyntheticEvent, useEffect, useState } from "react";
import Container from "../components/Container";
import { Button, Dropdown, Input } from "../components/Globals";

export default function () {

    const [courses, setCourses] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);
            const data = await response.json();
            if (data?.courses) {
                console.log(data.courses);
                setCourses(courses);
            }
        })();
    }, []);

    const onChange = (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
    };

    return (
        <Container>
            <form
                className="flex flex-row flex-wrap"
                method="POST"
            >
                <Dropdown
                    label="Course"
                    name="course"
                    datas={courses}
                />
                <Input
                    title="First Name"
                    id="firstName"
                    onChange={onChange}
                />
                <Input
                    title="Last Name"
                    id="lastName"
                    onChange={onChange}
                />
                <Input
                    title="Middle Name"
                    id="middleName"
                    onChange={onChange}
                />
                <Input
                    title="Suffix"
                    id="suffix"
                    onChange={onChange}
                />
                <Input
                    title="Suffix"
                    id="suffix"
                    onChange={onChange}
                />
                <Input
                    title="Solicitation Form #"
                    id="solicitationFormNum"
                    onChange={onChange}
                />
                <Input
                    title="First Name"
                    id="cfFirstName"
                    onChange={onChange}
                />
                <Input
                    title="Last Name"
                    id="cfLastName"
                    onChange={onChange}
                />
                <Input
                    title="Middle Name"
                    id="cfmiddleName"
                    onChange={onChange}
                />
                <Input
                    title="Suffix"
                    id="cfSuffix"
                    onChange={onChange}
                />
                <Input
                    title="Relation"
                    id="cfRelation"
                    onChange={onChange}
                />
                <Button>Submit</Button>
            </form>
        </Container>
    );
}