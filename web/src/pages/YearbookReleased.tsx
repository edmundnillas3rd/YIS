import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Dropdown, Input, Container, Table } from "../components/Globals";
import { v4 as uuid } from "uuid";
import { generateYearRange } from "../utilities/generateYearRange";
import YearbookReleasedModal from "../components/YearbookRelease/YearbookReleasedModal";
import { capitalizeRegex, suffixRegex } from "../utilities/regex";

export default function () {

    const [currentNode, setCurrentNode] = useState<any>();
    const [displayYearbookModal, setDisplayYearbookModal] = useState<boolean>(false);
    const [courses, setCourses] = useState<string>("");
    const [yearbooks, setYearbooks] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [errMessage, setErrMessage] = useState<string>("");

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [course, setCourse] = useState<string>("");
    const [suffix, setSuffix] = useState<string>("");
    const [yearGraduated, setYearGraduated] = useState<string>("");

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

            const [yearbookData, coursesData] = await Promise.all([yearbookRes.json(), courseRes.json()]);

            if (coursesData.courses && years) {
                setCourse(coursesData.courses[0]['id']);
                setYearGraduated(years[0].toString());
            }

            setCourses(coursesData.courses);
            setStatuses(yearbookData.yearbookStatuses);
            setYearbooks(yearbookData.yearbook.map((item: any) => ({ uuid: uuid(), ...item })));
        })();
    }, []);

    const onChange = (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        setErrMessage("");

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
            case "yearGraduated":
                setYearGraduated(target.value);
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
                suffix,
                course,
                yearGraduated
            };

            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/yearbook-released`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)

                });
            } catch (err: any) {
                console.log(err);
            }
        } else {
            setErrMessage("Complete all required fields marked with (*)");
        }
    };

    const yearbookReleasedHeaders = [
        "NAME",
        "COURSE",
        "YEAR GRADUATED",
        "YEARBOOK STATUS",
        "DATE RELEASED",
        "CARE OF"
    ];

    const onClick = async (data: any) => {
        setDisplayYearbookModal(true);
        setCurrentNode(data);
    };

    const onClose = async () => {
        setCurrentNode(null);
        setDisplayYearbookModal(false);
    };

    return courses && (
        <article className="flex flex-col justify-center w-full">
            <YearbookReleasedModal
                isOpen={displayYearbookModal}
                onClose={onClose}
                hasCloseBtn={true}
                data={currentNode}
                data2={statuses}
            />
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
                        pattern={capitalizeRegex}
                        min={3}
                        max={45}
                    />
                    <Dropdown
                        label="YEAR GRADUATED"
                        name="yearGraduated"
                        datas={years}
                        onChange={onChange}
                    />
                    <Dropdown
                        label="COURSE"
                        name="course"
                        datas={courses}
                        onChange={onChange}

                    />
                    <section className="flex flex-row flex-wrap gap-1">
                        <Input
                            title="FIRST NAME"
                            id="firstName"
                            onChange={onChange}
                            pattern={capitalizeRegex}
                            min={3}
                            max={45}
                            required={true}
                        />
                        <Input
                            title="LAST NAME"
                            id="lastName"
                            onChange={onChange}
                            pattern={capitalizeRegex}
                            min={3}
                            max={45}
                            required={true}
                        />
                        <section className="flex flex-col gap-1 items-center ">
                            <Input
                                title="MIDDLE NAME"
                                id="middleName"
                                onChange={onChange}
                                pattern={capitalizeRegex}
                                min={3}
                                max={45}
                                required={true}
                            />
                            <p className="text-zinc-500 font-bold">(NOTE: SPELL OUT THE MIDDLE NAME)</p>
                        </section>
                        <section className="flex flex-col gap-1 items-center">
                            <Input
                                title="SUFFIX"
                                id="suffix"
                                onChange={onChange}
                                pattern={suffixRegex}
                                min={3}
                                max={45}
                            />
                            <p className="text-zinc-500 font-bold">EX. SR, JR, I, II, III</p>
                        </section>
                    </section>
                    <section className="flex flex-col gap-1 mt-5">
                        <h3 className="font-bold">Care Of (Relation)</h3>
                    </section>
                    <section className="flex flex-row flex-wrap gap-1">
                        <Input
                            title="FIRST NAME"
                            id="cfFirstName"
                            onChange={onChange}
                            pattern={capitalizeRegex}
                        />
                        <Input
                            title="LAST NAME"
                            id="cfLastName"
                            onChange={onChange}
                            pattern={capitalizeRegex}
                        />
                        <Input
                            title="MIDDLE NAME"
                            id="cfmiddleName"
                            onChange={onChange}
                            pattern={capitalizeRegex}
                        />
                        <Input
                            title="SUFFIX"
                            id="cfSuffix"
                            onChange={onChange}
                            pattern={suffixRegex}
                        />
                        <Input
                            title="RELATION TO STUDENT"
                            id="cfRelation"
                            onChange={onChange}
                            pattern={capitalizeRegex}
                        />
                    </section>
                    <section className="flex flex-row justify-end items-center gap-1">
                        {errMessage && <p className="font-bold text-red-400">{errMessage}</p>}
                        <Button onClick={onSubmit}>Submit</Button>
                    </section>
                </form>
            </Container>
            <Container>
                {yearbooks && (
                    <Table columns={yearbookReleasedHeaders} datas={yearbooks} onClickCallback={onClick}
                    />
                )
                }
            </Container>
        </article>
    );
}