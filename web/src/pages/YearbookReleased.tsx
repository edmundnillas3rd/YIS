import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Dropdown, Input, Container, Table } from "../components/Globals";
import { generateYearRange } from "../utilities/generateYearRange";

export default function () {
    const [courses, setCourses] = useState<string>("");
    const [yearbooks, setYearbooks] = useState([]);

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
            const yearbookRes = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks`);
            const courseRes = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);

            const [yearbook, course] = await Promise.all([yearbookRes.json(), courseRes.json()])
            // const data = await courseRes.json();
            // if (data?.courses) {
            //     setCourses(data.courses);
            // }

            setCourses(course.courses);
            setYearbooks(yearbook.yearbook);
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

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/release-yearbook`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            })
        } else {
            console.log("Complete All Required Fields");
            
        }
    };

    return courses && (
        <>
        <Container>
            <form
                onSubmit={onSubmit}
                method="POST"
                className="flex flex-col gap-1"
            >
                <section className="flex flex-col gap-1">
                    <h3 className="font-bold">Student Information</h3>
                </section>
                <Input
                    title="SCHOOL ID"
                    id="school-id"
                    onChange={onChange}
                />
                <Dropdown
                    label="YEAR GRADUATED"
                    name="course"
                    datas={years}
                />
                <Dropdown
                    label="COURSE"
                    name="course"
                    datas={courses}
                    onClick={(e: SyntheticEvent) => setCourse((e.target as HTMLInputElement).value)}
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
                <section className="flex flex-row justify-end">
                <Button onClick={onSubmit}>Submit</Button>
                </section>
            </form>
        </Container>
        <Container>
            <Table columns={["NAME", "YEABOOK STATUS", "DATE RELEASED"]} datas={yearbooks} onClickCallback={function (data: any): void {
                    throw new Error("Function not implemented.");
                } }            
            />
        </Container>
        </>
    );
}