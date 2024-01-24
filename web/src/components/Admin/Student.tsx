import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Container, Dropdown, Input, Table } from "../Globals";
import { useNavigate } from "react-router-dom";

export default function () {

    const [firstName, setFirstName] = useState<string>();
    const [middleName, setMiddleName] = useState<string>();
    const [familyName, setFamilyName] = useState<string>();
    const [suffix, setSuffix] = useState<string>();
    const [schoolID, setSchoolID] = useState<string>();
    const [yearGraduated, setYearGraduated] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [course, setCourse] = useState<string>();

    const [courses, setCourses] = useState();
    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const courseResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);
                const userStudentsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);

                const [courseData, userStudentsData] = await Promise.all([
                    courseResponse.json(),
                    userStudentsResponse.json()
                ])

                const { courses } = courseData;
                const { studentUsers } = userStudentsData;
                

                if (courses) {
                    setCourse(courses[0]['id'])
                    setCourses(courses);
                }

                if (studentUsers) {
                    setStudents(studentUsers);
                }


            } catch (error) {
                console.error(error);
            }
        })();

    }, []);

    const attr = [
        "FIRST NAME",
        "MIDDLE NAME",
        "FAMILY NAME",
        "SUFFIX",
        "YEAR GRADUATED",
        "COURSE"
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
            case "password":
                setPassword(target.value);
                break;
            case "yearGraduated":
                setYearGraduated(target.value);
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
            password,
            yearGraduated,
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

    return (
        <Container>

            <form method="POST" onSubmit={onSubmitHandler}>
                <section className="flex flex-row gap-1">
                    <Input
                        title="FIRST NAME"
                        id="firstName"
                        onChange={onChange}
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
                    />
                    <Input
                        title="PASSWORD"
                        id="password"
                        type="password"
                        onChange={onChange}
                    />
                    <Input
                        title="YEAR GRADUATED"
                        id="yearGraduated"
                        onChange={onChange}
                    />
                    <Dropdown
                        label="COURSE"
                        datas={courses}
                        onChange={onChange}
                    />
                </section>

                <section className="flex flex-auto flex-row justify-end p-5">
                    <Button>Add</Button>
                </section>
            </form>
            <Table
                onClickCallback={e => ({})}
                columns={attr}
                datas={students}
            />
        </Container>

    );
}