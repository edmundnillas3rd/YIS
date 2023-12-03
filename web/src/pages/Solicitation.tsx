import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import {
    Button,
    Dropdown,
    Input,
    Container,
    Table,
    Spinner
} from "../components/Globals";

export default function () {

    const [courses, setCourses] = useState();
    const [solis, setSolis] = useState([]);
    const [datas, setDatas] = useState({
        filteredData: []
    });

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
            const courseResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);

            const solisResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation`);

            const [course, soli] = await Promise.all([courseResponse.json(), solisResponse.json()]);


            if (course && soli) {
                setCourses(course.courses);
                const formattedData = soli.solis.map((soli: any) => ({
                    uuid: uuid(),
                    ...soli
                }));
                setSolis(formattedData);
                setDatas({
                    filteredData: formattedData
                });
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

    const soliFilters = [
        "--FILTER USERS--",
        "ALL",
        "RETURNED",
        "UNRETURNED",
    ];

    const onChangeFilter = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;

        if (target.value === "RETURNED" || target.value === "UNRETURNED") {
            console.log(target.value);

            let filterData = solis.filter(soli => (soli['returnedStatus'] === `${target.value}`));

            console.log(filterData);


            setDatas(soli => ({
                filteredData: filterData
            }));
        } else {
            setDatas(soli => ({
                filteredData: solis
            }));
        }


        // switch (target.value) {
        //     case "ALL":
        //         setDatas(solis);
        //         break;
        //     case "RETURNED":
        //         setDatas(solis.filter(soli => soli['returnedStatus'] === "RETURNED"));
        //         break;
        //     case "UNRETURNED":
        //         setDatas(solis.filter(soli => soli['returnedStatus'] === "UNRETURNED"));
        //         break;
        // }
    };

    const attr = [
        "COURSE",
        "NAME",
        "SOLI #",
        "CARE OF",
        "CARE OF RELATION",
        "SOLI STATUS",
        "DATE RETURNED",
        "PAYMENT STATUS",
        "PAYMENT",
        "OR #"
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
                        {courses && <Dropdown
                            label="Course"
                            name="course"
                            datas={courses}
                        />}
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
                        <p className="text-gray-600">NOTE: IN CASE OF LOSS, THEY MUST PAY PHP 200 FEE</p>
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
                            title="RELATION"
                            id="cfRelation"
                            onChange={onChange}
                        />
                    </section>
                    <Button>Submit</Button>
                </form>
            </Container>
            <Container>
                <section className="flex flex-row gap-5">
                    <Input
                        placeholder="Search the name of student"
                    />
                    <Dropdown
                        label=""
                        name="filterSoli"
                        datas={soliFilters}
                        onChange={onChangeFilter}
                    />
                </section>

                {datas?.filteredData ? (
                    <Table
                        columns={attr}
                        datas={datas.filteredData}
                        onClickCallback={onClick}
                    />
                ) : (

                    <section className="flex flex-row justify-center">
                        <Spinner />
                    </section>
                )
                }
            </Container>
        </>
    );
}