import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { read, writeFileXLSX } from "xlsx";
import {
    Button,
    Dropdown,
    Input,
    Container,
    Table,
    Spinner
} from "../components/Globals";
import { useNavigate } from "react-router-dom";
import SoliciitationModal from "../components/Solicitation/SoliciitationModal";
import { capitalizeRegex, suffixRegex } from "../utilities/regex";
import { searchStudentSolicitationStatus } from "../utilities/students";
import SolicitationAddModal from "../components/Solicitation/SolicitationAddModal";

export default function () {
    const searchbarRef = useRef<HTMLInputElement>(null);
    const inputFullNameRef = useRef<HTMLInputElement>(null);
    const inputSoliNumRef = useRef<HTMLInputElement>(null);
    const selectCourseRef = useRef<HTMLSelectElement>(null);

    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState();
    const [solis, setSolis] = useState<any>(null);
    const [datas, setDatas] = useState<any>({
        rawData: null,
        filteredData: null
    });
    const [statuses, setStatuses] = useState({});
    const [currentNode, setCurrentNode] = useState(null);
    const [remainingStudents, setRemainingStudents] = useState<string>();
    const [filter, setFilter] = useState("");
    const [searchedData, setSearchData] = useState([]);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);

    // Student
    const [firstName, setFirstName] = useState<string>("");
    const [familyName, setFamilyName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [suffix, setSuffix] = useState<string>("");
    const [course, setCourse] = useState<string>("");
    const [soliNum, setSoliNum] = useState<string>("");

    // Care Of
    const [cfFirstName, setCfFirstName] = useState<string>("");
    const [cfLastName, setCfLastName] = useState<string>("");
    const [cfMiddleName, setCfMiddleName] = useState<string>("");
    const [cfSuffix, setCfSuffix] = useState<string>("");
    const [cfRelation, setCfRelation] = useState<string>("");

    const navigate = useNavigate();

    const filteredTableData = useMemo(() => {

        if (searchedData.length > 0) {
            return searchedData;
        }

        if (filter === "RETURNED ALL" || filter === "UNRETURNED" || filter === "LOST") {


            let filterData = solis.filter((soli: any) => (soli['returnedStatus'] === `${filter}`));




            // setDatas((soli: any) => ({
            //     ...soli,
            //     filteredData: filterData
            // }));

            return filterData;
        } else {
            // setDatas((soli: any) => ({
            //     ...soli,
            //     filteredData: solis
            // }));
            return solis;
        }
    }, [datas, solis, filter, searchedData]);

    useEffect(() => {
        (async () => {
            const courseResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);

            const solisResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation`);

            const yearbookResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks`);

            const [course, soli, yearbook] = await Promise.all([courseResponse.json(), solisResponse.json(), yearbookResponse.json()]);


            if (course && soli && yearbook) {


                setCourses(course.courses);
                setCourse(course.courses[0]['id']);

                const formattedData = soli.solis.map(({ firstName, middleName, lastName, suffix, ...attr }: any) => ({
                    uuid: uuid(),
                    ...attr
                }));

                setRemainingStudents(soli['remainingUnpaid']);
                setSolis(formattedData);
                setDatas({
                    rawData: soli.solis,
                    filteredData: formattedData
                });

                const { statuses, paymentStatuses } = soli;

                setStatuses({
                    statuses,
                    paymentStatuses
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
            case "familyName":
                setFamilyName(target.value);
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

    const onClickHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        setFilter(null as any);
        setSearchData([]);
    };

    const onChangeSearch = async (event: SyntheticEvent) => {
        event.preventDefault();

        const value = searchbarRef.current!.value;

        if (value.length === 0) {
            setFilter(null as any);
            setSearchData([]);
        }
        // const target = event.target as HTMLInputElement;
        // setSearch(target.value);
    };

    const onSubmitSoli = async (event: SyntheticEvent) => {
        event.preventDefault();

        const fullName = inputFullNameRef.current!.value;
        const soliNum = inputSoliNumRef.current!.value;
        const course = selectCourseRef.current!.value;

        const data = {
            fullName,
            soliNum,
            course
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation/add-solicitation`, {
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
            console.error(error);
        }

    };

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);

        let careOf = null;

        if (cfFirstName &&
            cfLastName &&
            cfRelation) {
            careOf = {
                cfFirstName,
                cfLastName,
                cfMiddleName,
                cfSuffix,
                cfRelation
            };
        }

        if (firstName &&
            familyName &&
            middleName &&
            suffix &&
            course &&
            soliNum) {

        }

        // const data = {
        //     careOf,
        //     firstName,
        //     familyName,
        //     middleName,
        //     suffix,
        //     course,
        //     soliNum
        // };

        // const response = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation/solicitation-claim`, {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // });

        // if (response.ok) {
        //     navigate(0);
        //     setLoading(false);
        //     const data = await searchStudentSolicitationStatus(`
        //         ${familyName}, ${firstName} ${middleName}
        //     `);
        //     const filteredData = data.map((solicitationForm: any) => ({ uuid: uuid(), ...solicitationForm }));
        //     setDatas({
        //         filteredData
        //     });
        // }

        const data = await searchStudentSolicitationStatus(`${familyName}, ${firstName} ${middleName}`, course);

        const filteredData = data.map(({ firstName, middleName, lastName, suffix, ...attr }: any) => ({ uuid: uuid(), ...attr }));
        setDatas((state: any) => ({
            ...state,
            filteredData
        }));

        setLoading(false);

    };

    const onSearchSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        let value = searchbarRef.current!.value;

        const data = await searchStudentSolicitationStatus(value, course);
        const filteredData = data.map(({ ...attr }: any) => ({ uuid: uuid(), ...attr }));
        setDatas((state: any) => ({
            ...state,
            filteredData
        }));

        setSearchData(filteredData);
    };

    const onClick = async (data: any) => {
        setCurrentNode(datas.rawData.find((raw: any) => raw.id === data.id) as any);
    };

    const onCloseModal = async () => {
        setCurrentNode(null);
    };

    const onCloseAddModal = async () => {
        setShowAddModal(false);
    };

    const soliFilters = [
        "ALL",
        "RETURNED ALL",
        "UNRETURNED",
        "LOST"
    ];

    const onChangeFilter = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        setFilter(target.value as any);

        // if (target.value === "RETURNED ALL" || target.value === "UNRETURNED" || target.value === "LOST") {
        // 
        // 
        // let filterData = solis.filter((soli: any) => (soli['returnedStatus'] === `${target.value}`));
        // 
        // 
        // 
        // 
        // setDatas((soli: any) => ({
        // ...soli,
        // filteredData: filterData
        // }));
        // } else {
        // setDatas((soli: any) => ({
        // ...soli,
        // filteredData: solis
        // }));
        // }
    };

    const onDownloadHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation/download-sheet`, {
                method: "GET",
                credentials: "include"
            });
            const buffer = await response.arrayBuffer();
            const bytes = new Uint8Array(buffer);

            const workbook = read(bytes);
            writeFileXLSX(workbook, "unpaid-unreturned-solis.xlsx");

        } catch (error) {
            console.error(error);
        }
    };

    const attr = [
        "COURSE",
        "NAME",
        "SOLI #'s",
        "CARE OF",
        "CARE OF RELATION",
        "RETURNED SOLIS",
        "UNRETURNED/LOST SOLIS",
        "LOST OR #",
        "DATE RETURNED",
        "YEARBOOK PAYMENT",
        "OR #",
        "FULL PAYMENT",
        "CURRENT PAYMENT STATUS",
        "CURRENT SOLI STATUS"
    ];

    return (
        <article className="flex flex-col">
            {statuses && courses && (
                <>
                    <SoliciitationModal
                        hasCloseBtn={true}
                        isOpen={!!currentNode}
                        onClose={onCloseModal}
                        data={currentNode}
                        data2={statuses}
                    />
                    <SolicitationAddModal
                        hasCloseBtn={true}
                        isOpen={showAddModal}
                        onClose={onCloseAddModal}
                        data={statuses}
                        data2={courses}
                    />
                </>
            )}
            {/* <Container>
                <form
                    className="flex flex-col gap-2"
                    method="POST"
                    onSubmit={onSubmit}
                >
                    <h3 className="font-bold">Student Information</h3>
                    <section className="flex flex-row flex-wrap items-center gap-1">
                        {courses && <Dropdown
                            label="COURSE"
                            name="course"
                            datas={courses}
                            defaultValue={courses[0]['id']}
                            onChange={onChange}
                        />}
                        <Input
                            title="FIRST NAME"
                            id="firstName"
                            onChange={onChange}
                            pattern={capitalizeRegex}
                            required
                        />
                        <Input
                            title="LAST NAME"
                            id="familyName"
                            onChange={onChange}
                            pattern={capitalizeRegex}
                            required
                        />
                        <Input
                            title="MIDDLE NAME"
                            id="middleName"
                            onChange={onChange}
                            pattern={capitalizeRegex}
                        />
                        <Input
                            title="SUFFIX"
                            id="suffix"
                            onChange={onChange}
                            pattern={suffixRegex}
                        />
                        <Input
                            title="SOLICITATION FORM # (EX. 2023-2010)"
                            id="solicitationFormNum"
                            onChange={onChange}
                            pattern={"\\d{4}-\\d{4}"}
                            required
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
                            title="RELATION"
                            id="cfRelation"
                            onChange={onChange}
                            pattern={capitalizeRegex}
                        />
                    </section>
                    <section className="flex flex-row justify-end">
                        <Button>
                            {loading ? (
                                <Spinner />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </section>
                </form>
            </Container> */}
            <Container>
                <section className="flex flex-row gap-1">
                    <form
                        className="flex flex-auto flex-row justify-end items-center gap-2"
                        onSubmit={onSearchSubmit}
                        method="POST"
                    >
                        <Input
                            placeholder="Search the name of student"
                            onChange={onChangeSearch}
                            // onClick={onClickHandler}
                            width="flex-auto"
                            ref={searchbarRef}
                        />
                        <Button >Search</Button>
                    </form>

                    {/* <Button onClick={(e: SyntheticEvent) => {
                        e.preventDefault();
                        setShowAddModal(true);
                    }}>Add Solicitation Form</Button> */}
                    <section className="flex flex-row justify-end items-center gap-2 mx-2">
                        <h1>
                            Remaining unpaid and unreturned solis:
                            <span className="font-bold"> {remainingStudents}</span>
                        </h1>
                        <Button onClick={onDownloadHandler}>Download</Button>

                    </section>
                    <Dropdown
                        label=""
                        name="filterSoli"
                        datas={soliFilters}
                        onChange={onChangeFilter}
                    />
                </section>
                <section>
                    <form
                        className="flex flex-row gap-1 items-center"
                        method="POST"
                        onSubmit={onSubmitSoli}
                    >
                        <Input
                            title="NAME OF STUDENT"
                            id="name"
                            ref={inputFullNameRef}
                        />
                        <Input
                            title="SOLI FORM #"
                            id="soliNum"
                            ref={inputSoliNumRef}
                        />
                        <Dropdown
                            label="COURSE"
                            name="course"
                            datas={courses}
                            ref={selectCourseRef}
                        />
                        <section className="mt-5"><Button>Add Soli</Button></section>
                    </form>
                </section>
                {filteredTableData && (
                    <Table
                        key={filteredTableData.length}
                        columns={attr}
                        datas={filteredTableData}
                        onClickCallback={onClick}
                        buttonRowName="View"
                    />
                )}
            </Container>
        </article>
    );
}