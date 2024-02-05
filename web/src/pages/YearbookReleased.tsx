import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button, Dropdown, Input, Container, Table } from "../components/Globals";
import { v4 as uuid } from "uuid";
import { generateYearRange } from "../utilities/generateYearRange";
import YearbookReleasedModal from "../components/YearbookRelease/YearbookReleasedModal";
import { capitalizeRegex, suffixRegex } from "../utilities/regex";
import { searchStudentSolicitationStatus, searchStudentYearbookStatus } from "../utilities/students";
import { read, writeFileXLSX } from "xlsx";
import { useNavigate } from "react-router-dom";

export default function () {
    const inputFirstNameRef = useRef<HTMLInputElement>(null);
    const inputFamilyNameRef = useRef<HTMLInputElement>(null);
    const inputMiddleNameRef = useRef<HTMLInputElement>(null);
    const inputSuffixRef = useRef<HTMLInputElement>(null);
    const selectYearRef = useRef<HTMLSelectElement>(null);
    const selectCourseRef = useRef<HTMLSelectElement>(null);

    const searchbarRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>("");
    const [datas, setDatas] = useState({
        filteredData: []
    });
    const [currentNode, setCurrentNode] = useState<any>();
    const [displayYearbookModal, setDisplayYearbookModal] = useState<boolean>(false);
    const [courses, setCourses] = useState<string>("");
    const [yearbooks, setYearbooks] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [errMessage, setErrMessage] = useState<string>("");
    const [remainingStudents, setRemaining] = useState<string>("");

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [course, setCourse] = useState<string>("");
    const [suffix, setSuffix] = useState<string>("");
    const [schoolYear, setSchoolYear] = useState<string>("");

    const [cfFirstName, setCfFirstName] = useState<string>("");
    const [cfLastName, setCfLastName] = useState<string>("");
    const [cfMiddleName, setCfMiddleName] = useState<string>("");
    const [cfSuffix, setCfSuffix] = useState<string>("");
    const [cfRelation, setCfRelation] = useState<string>("");

    const years = generateYearRange();
    const [filter, setFilter] = useState<number>();
    const [searchedData, setSearchData] = useState<any>([]);

    const navigate = useNavigate();

    const filteredTableData = useMemo(() => {

        if (searchedData?.length && searchedData.length > 0) {

            console.log("Executing", searchedData);

            return searchedData;

        }


        // setDatas((soli: any) => ({
        //     ...soli,
        //     filteredData: filterData
        // }));

        // setDatas({
        //     filteredData: yearbooks.filter((item: any) => {
        //         const formattedDate = new Date(item['dateReleased']);
        //         return formattedDate.getFullYear() === Number.parseInt(target.value) as any;
        //     })
        // })

        return yearbooks.filter((item: any) => {
            return item['schoolYear'] === Number.parseInt(filter as any) as any;
        });
    }, [datas, filter, searchedData]);

    useEffect(() => {
        (async () => {
            const yearbookRes = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks`);
            const courseRes = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);

            const [yearbookData, coursesData] = await Promise.all([yearbookRes.json(), courseRes.json()]);

            if (coursesData.courses && years) {
                setCourse(coursesData.courses[0]['id']);
                setSchoolYear(years[0].toString());
            }

            setFilter(years[0]);


            setCourses(coursesData.courses);
            setRemaining(yearbookData['remaminingUnpaidOrUnClaimed']);
            setStatuses({
                yearbookStatuses: yearbookData.yearbookStatuses,
                yearbookPaymentStatuses: yearbookData.yearbookPaymentStatuses

            });
            const ybs = yearbookData.yearbook.map((item: any) => ({ uuid: uuid(), ...item }));
            setYearbooks(ybs);

            setDatas({
                filteredData: yearbookData.yearbook.map((item: any) => ({ uuid: uuid(), ...item }))
            });
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
            case "schoolYear":
                setSchoolYear(target.value);
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
                schoolYear
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

            }
        } else {
            setErrMessage("Complete all required fields marked with (*)");
        }
    };

    const yearbookReleasedHeaders = [
        "NAME",
        "YEARBOOK STATUS",
        "DATE RELEASED",
        "CARE OF",
        "CARE OF RELATION",
        "S.Y."
    ];

    const onSearchSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const value = searchbarRef.current!.value;

        const data = await searchStudentYearbookStatus(value);
        const filteredData = data.map(({ ...attr }: any) => ({ uuid: uuid(), ...attr }));


        setSearchData(filteredData);
    };

    const onChangeSearch = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;
        if (target.value.length === 0) {
            setSearchData(yearbooks);
        }
    };

    const onChangeFilter = async (event: SyntheticEvent) => {
        event.preventDefault();
        setSearchData([]);


        const target = event.target as HTMLInputElement;
        console.log("....", target.value);

        setFilter(target.value as any);
        setDatas({
            filteredData: yearbooks.filter((item: any) => {
                return item['schoolYear'] === Number.parseInt(target.value) as any;
            })
        });

    };

    const onClick = async (data: any) => {

        setCurrentNode(data);
        setDisplayYearbookModal(true);
    };

    const onClose = async () => {
        setCurrentNode(null);
        setDisplayYearbookModal(false);
    };

    const onDownloadHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/download-unpaid-unclaimed-sheet`, {
                method: "GET",
                credentials: "include"
            });
            const buffer = await response.arrayBuffer();
            const bytes = new Uint8Array(buffer);

            const workbook = read(bytes);
            writeFileXLSX(workbook, "unpaid-unclaimed-yearbooks.xlsx");

        } catch (error) {
            console.error(error);
        }
    };

    const onSubmitYearbook = async (event: SyntheticEvent) => {
        event.preventDefault();

        const firstName = inputFirstNameRef.current!.value;
        const lastName = inputFamilyNameRef.current!.value;
        const middleName = inputMiddleNameRef.current!.value;
        const suffix = inputSuffixRef.current!.value;
        const schoolYear = selectYearRef.current!.value;

        const data = {
            firstName,
            lastName,
            middleName,
            suffix,
            schoolYear
        }

        console.log(data);
        

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/add-yearbook`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                navigate(0);
            }
        } catch (error) {
            
        }
    }

    return courses && (
        <article className="flex flex-col justify-center w-full">
            <YearbookReleasedModal
                isOpen={displayYearbookModal}
                onClose={onClose}
                hasCloseBtn={true}
                data={currentNode}
                data2={statuses}
            />
            {/* <Container>
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
                        label="SCHOOL YEAR"
                        name="schoolYear"
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
            </Container> */}
            <Container>
                <section
                    className="flex flex-row gap-5"
                >
                    <form
                        className="flex flex-auto flex-row justify-end items-center gap-2"
                        onSubmit={onSearchSubmit}
                        method="POST"
                    >
                        <Input
                            placeholder="Search the name of student"
                            onChange={onChangeSearch}
                            ref={searchbarRef}
                            width="flex-auto"
                        />
                        <Button >Search</Button>
                    </form>
                    <section className="flex flex-row justify-end items-center gap-2">
                        <h1>
                            Remaining unclaimed yearbooks:
                            <span className="font-bold"> {remainingStudents}</span>
                        </h1>
                        <Button onClick={onDownloadHandler}>Download</Button>
                    </section>
                    <Dropdown
                        label="S.Y."
                        name="filterSoli"
                        datas={years}
                        onChange={onChangeFilter}
                    />
                </section>
                <section className="flex flex-row gap-5">
                    <form
                        className="flex flex-auto flex-row items-center gap-2"
                        onSubmit={onSubmitYearbook}
                        method="POST"
                    >
                        <Input
                            placeholder="FIRST NAME"
                            ref={inputFirstNameRef}
                            required={true}
                            // ref={searchbarRef}
                        />
                        <Input
                            placeholder="FAMILY NAME"
                            ref={inputFamilyNameRef}
                            required={true}

                            // ref={searchbarRef}
                        />
                        <Input
                            placeholder="MIDDLE NAME"
                            ref={inputMiddleNameRef}
                            // ref={searchbarRef}
                        />
                        <Input
                            placeholder="SUFFIX"
                            ref={inputSuffixRef}
                            // ref={searchbarRef}
                        />
                        <Dropdown
                            datas={years}
                            ref={selectYearRef}
                        />
                        {/* <Dropdown
                            datas={courses}
                            ref={selectCourseRef}
                        /> */}
                        <Button >Add Yearbook</Button>
                    </form>
                </section>
            </Container>

            <Container>
                {filteredTableData && (
                    <Table
                        key={filteredTableData.length}
                        columns={yearbookReleasedHeaders}
                        datas={filteredTableData}
                        onClickCallback={onClick}
                    />
                )
                }
            </Container>
        </article>
    );
}