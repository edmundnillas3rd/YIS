import { SyntheticEvent, useEffect, useState } from "react";
import Container from "../components/Container";
import { Button, Dropdown, Input } from "../components/Globals";
import Table from "../components/Table";

export default function () {

    const [courses, setCourses] = useState();

    // Student
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [middleName, setMiddleName] = useState<string>();
    const [suffix, setSuffix] = useState<string>();
    const [soliNum, setSoliNum] = useState<string>();

    // Care Of
    const [cfFirstName, setCfFirstName] = useState<string>();
    const [cfLastName, setCfLastName] = useState<string>();
    const [cfMiddleName, setCfMiddleName] = useState<string>();
    const [cfSuffix, setCfSuffix] = useState<string>();
    const [cfRelation, setCfRelation] = useState<string>();

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
            case "solicitationFormNum":
                setSoliNum(target.value);
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
            suffix,

        };
    };

    const onClick = async (data: any) => {
        console.log(data);

    };

    const attr = [
        "COURSE",
        "NAME",
        "SOLI #",
        "CARE OF",
        "SOLI STATUS",
        "DATE RETURNED",
        "PAYMENT STATUS"
    ];

    const datas = [
        {
            id: "0",
            couse: "COMPUTER SCIENCE",
            name: "EDMUND NILLAS III",
            solicNum: "7001",
            careOf: "N/A",
            soliStatus: "UNRETURNED",
            dateReturned: "N/A",
            paymentStatus: "HALF-PAID"
        }
    ];

    return (
        <>

            <Container>
                <form
                    className="flex flex-col gap-2"
                    method="POST"
                >
                    <h3 className="font-bold">Student Information</h3>
                    <section className="flex flex-row flex-wrap gap-1">
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
                            title="Solicitation Form # (EX. 2023-2010)"
                            id="solicitationFormNum"
                            onChange={onChange}
                        />
                    </section>
                    <section className="flex flex-col gap-1">
                        <h3 className="font-bold">Care Of</h3>
                        <p className="text-gray-600">NOTE: IN CASE OF, CAREE OF MUST LOSS MUST PAY PHP 200</p>
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
                </form>
            </Container>
            <Container>
                <Input
                    placeholder="Search the name of student"
                />
                <Table
                    columns={attr}
                    datas={datas}
                    onClickCallback={onClick}
                />
            </Container>
        </>
    );
}