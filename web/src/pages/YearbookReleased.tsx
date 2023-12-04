import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Dropdown, Input, Container } from "../components/Globals";
import { generateYearRange } from "../utilities/generateYearRange";

export default function () {
    const [courses, setCourses] = useState<string>("");

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [course, setCourse] = useState<string>("");
    const [suffix, setSuffix] = useState<string>("");

    const [cfFirstName, setCfFirstName] = useState<string>("");
    const [cfLastName, setCfLastName] = useState<string>("");
    const [cfMiddleName, setCfMiddleName] = useState<string>("");
    const [cfSuffix, setCfSuffix] = useState<string>("");
    const [cfRelation, setCfRelation] = useState<string>("");

    const years = generateYearRange();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);
            const data = await response.json();
            if (data?.courses) {
                setCourses(data.courses);
            }
        })();
    }, []);

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
            case "course":
                setCourse(target.value);
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

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (firstName &&
            lastName &&
            middleName &&
            course
        ) {

            const careOf = {
                cfFirstName,
                cfLastName,
                cfMiddleName,
                cfSuffix,
                cfRelation
            };

            const data = {
                careOf,
                firstName,
                lastName,
                middleName,
                course,
                suffix
            };
        }
    };

    return courses && (
        <Container>
            <form
                onSubmit={onSubmit}
                method="POST"
            >
                <section className="flex flex-col gap-1">
                    <h3 className="font-bold">Student Information</h3>
                </section>
                <Dropdown
                    label="YEAR GRADUATED"
                    name="course"
                    datas={years}
                />
                <Dropdown
                    label="COURSE"
                    name="course"
                    datas={courses}
                />
                <section className="flex flex-row flex-wrap gap-1">
                    <Input
                        title="FIRST NAME"
                        id="firstName"
                        onChange={onChange}
                    />
                    <Input
                        title="LAST NAME"
                        id="lastName"
                        onChange={onChange}
                    />
                    <Input
                        title="MIDDLE NAME"
                        id="middleName"
                        onChange={onChange}
                    />
                    <Input
                        title="SUFFIX"
                        id="suffix"
                        onChange={onChange}
                    />
                </section>
                <section className="flex flex-col gap-1 mt-5">
                    <h3 className="font-bold">Care Of (Relation)</h3>
                </section>
                <section className="flex flex-row flex-wrap gap-1">
                    <Input
                        title="FIRST NAME"
                        id="cfFirstName"
                        onChange={onChange}
                    />
                    <Input
                        title="LAST NAME"
                        id="cfLastName"
                        onChange={onChange}
                    />
                    <Input
                        title="MIDDLE NAME"
                        id="cfmiddleName"
                        onChange={onChange}
                    />
                    <Input
                        title="SUFFIX"
                        id="cfSuffix"
                        onChange={onChange}
                    />
                    <Input
                        title="RELATION TO STUDENT"
                        id="cfRelation"
                        onChange={onChange}
                    />
                </section>
                <Button>Submit</Button>
            </form>
        </Container>
    );
}