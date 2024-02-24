import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button, Container, Dropdown, Input, Table } from "../Globals";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import StudentModal from "./Stutdent/StudentModal";

export default function () {

    const searchbarRef = useRef<HTMLInputElement>(null);
    const [datas, setDatas] = useState<any>({
        rawData: null,
        filteredData: null
    });
    const [filter, setFilter] = useState("");
    const [searchedData, setSearchData] = useState([]);


    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [familyName, setFamilyName] = useState<string>("");
    const [suffix, setSuffix] = useState<string>("");
    const [schoolID, setSchoolID] = useState<string>("");
    const [schoolYear, setSchoolYear] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [course, setCourse] = useState<string>("");

    const [courses, setCourses] = useState();
    const [students, setStudents] = useState<any>(null);
    const [rawData, setRawData] = useState<any>();

    const [currentNode, setCurrentNode] = useState<any>(null);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const courseResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);
                const userStudentsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);

                const [courseData, userStudentsData] = await Promise.all([
                    courseResponse.json(),
                    userStudentsResponse.json()
                ]);

                const { courses } = courseData;
                const { studentUsers } = userStudentsData;

                if (courses) {
                    setCourse(courses[0]['id']);
                    setCourses(courses);
                }




                setStudents(studentUsers.map(({ ...attr }: any) => ({ uuid: uuid(), ...attr })));
                setRawData(studentUsers);

            } catch (error) {
                console.error(error);
            }
        })();

    }, []);

    const filteredTableData = useMemo(() => {

        if (searchedData.length > 0) {
            return searchedData;
        }

        if (filter === "RETURNED ALL" || filter === "UNRETURNED" || filter === "LOST") {


            let filterData = students.filter((soli: any) => (soli['returnedStatus'] === `${filter}`));




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
            return students;
        }
    }, [datas, students, filter, searchedData]);

    const attr = [
        "FIRST NAME",
        "MIDDLE NAME",
        "FAMILY NAME",
        "SUFFIX",
        "SCHOOL YEAR",
        "COURSE",
        "SCHOOL ID",
        "EMAIL"
    ];

    const onChange = async (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "firstName":
                setFirstName(target.value);
                break;
            case "middleName":
                setMiddleName(target.value);
                break;
            case "familyName":
                setFamilyName(target.value);
                break;
            case "suffix":
                setSuffix(target.value);
                break;
            case "schoolID":
                setSchoolID(target.value);
                break;
            case "email":
                setEmail(target.value);
                break;
            case "password":
                setPassword(target.value);
                break;
            case "schoolYear":
                setSchoolYear(target.value);
                break;
            case "course":
                setCourse(target.value);
                break;
        }
    };

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            firstName,
            middleName,
            familyName,
            suffix,
            schoolID,
            email,
            password,
            schoolYear,
            course
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/user-signup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                navigate(0);
            }
        } catch (error) {
            console.error(error);

        }
    };

    const onSearchSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        let value = searchbarRef.current!.value;

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/student-search-registered`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fullName: value })
        })

        const data = await response.json();
        const filteredData = data.rows.map(({ ...attr }: any) => ({ uuid: uuid(), ...attr }));

        setDatas((state: any) => ({
            ...state,
            filteredData
        }));

        setSearchData(filteredData);
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

    const onClickHandler = async (data: any) => {
        setCurrentNode(data);
    };

    const onCloseModal = async () => {
        setCurrentNode(null);
    };

    return (
        <>
            <StudentModal
                hasCloseBtn={true}
                isOpen={!!currentNode}
                onClose={onCloseModal}
                data={currentNode}
                data2={courses}
            />
            <Container>
                <h3 className="font-bold">MANAGE STUDENTS</h3>

                <form method="POST" onSubmit={onSubmitHandler}>
                    <section className="flex flex-row gap-1">
                        <Input
                            title="FIRST NAME"
                            id="firstName"
                            onChange={onChange}
                            required
                        />
                        <Input
                            title="MIDDLE NAME"
                            id="middleName"
                            onChange={onChange}
                        />
                        <Input
                            title="FAMILY NAME"
                            id="familyName"
                            onChange={onChange}
                            required
                        />
                        <Input
                            title="SUFFIX"
                            id="suffix"
                            onChange={onChange}
                        />
                    </section>
                    <section className="flex flex-row gap-1">
                        <Input
                            title="SCHOOL ID"
                            id="schoolID"
                            onChange={onChange}
                            required
                        />
                         <Input
                            title="EMAIL"
                            id="email"
                            type="email"
                            onChange={onChange}
                            required
                        />
                        <Input
                            title="PASSWORD"
                            id="password"
                            type="password"
                            onChange={onChange}
                            required
                        />
                        <Input
                            title="SCHOOL YEAR"
                            id="schoolYear"
                            onChange={onChange}
                            required
                        />
                        <Dropdown
                            label="COURSE"
                            datas={courses}
                            onChange={onChange}
                            required
                        />
                    </section>

                    <section className="flex flex-auto flex-row justify-end p-5">
                        <Button>Add</Button>
                    </section>
                </form>
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
                {filteredTableData && (
                    <Table
                        key={filteredTableData.length}
                        onClickCallback={onClickHandler}
                        columns={attr}
                        datas={filteredTableData}
                    />
                )
                }

            </Container>
        </>

    );
}