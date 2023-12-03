import { SyntheticEvent, useState } from "react";
import Container from "../components/Container";
import { Button, Dropdown, Input } from "../components/Globals";
import { generateYearRange } from "../utilities/generateYearRange";

export default function () {
    const [courses, setCourses] = useState();

    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [middleName, setMiddleName] = useState<string>();
    const [suffix, setSuffix] = useState<string>();

    const [cfFirstName, setCfFirstName] = useState<string>();
    const [cfLastName, setCfLastName] = useState<string>();
    const [cfMiddleName, setCfMiddleName] = useState<string>();
    const [cfSuffix, setCfSuffix] = useState<string>();
    const [cfRelation, setCfRelation] = useState<string>();

    const years = generateYearRange();

    const onChange = (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "firstName":
                setFirstName(target.value);
                break;
            case "lastName":
                setLastName(target.value);
                break;
            case "middleName":
                setMiddleName(target.value);
                break;
            case "suffix":
                setSuffix(target.value);
                break;
            case "cfFirstName":
                setCfFirstName(target.value);
                break;
            case "cfLastName":
                setCfLastName(target.value);
                break;
            case "cfMiddelName":
                setCfMiddleName(target.value);
                break;
            case "cfSuffix":
                setCfSuffix(target.value);
                break;
            case "cfRelation":
                setCfRelation(target.value);
                break;
        }
    };

    return (
        <Container>
            <section className="flex flex-col gap-1">
                <h3 className="font-bold">Student Information</h3>
            </section>
            <Dropdown
                label="Year Graduated"
                name="course"
                datas={years}
            />
            <Dropdown
                label="Course"
                name="course"
                datas={courses}
            />
            <section className="flex flex-row flex-wrap gap-1">
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
            </section>
            <section className="flex flex-col gap-1 mt-5">
                <h3 className="font-bold">Care Of (Relation)</h3>
            </section>
            <section className="flex flex-row flex-wrap gap-1">
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
            </section>
            <Button>Submit</Button>
        </Container>
    );
}