import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Container, Dropdown, Input, Table } from "../Globals";
import { useNavigate } from "react-router-dom";
import CourseModal from "./Course/CourseModal";

export default function () {

    const [courses, setCourses] = useState([]);
    const [name, setName] = useState<string>();
    const [abbreviation, setAbbreviation] = useState<string>();
    const [currentNode, setCurrentNode] = useState<any>();

    const [departments, setDepartments] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const courseResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);

                const [courseData] = await Promise.all([
                    courseResponse.json(),
                ]);

                const { courses, departments } = courseData;

                if (courses && departments) {
                    setDepartments(departments);
                    setCourses(courses)
                }

            } catch (error) {
                console.error(error);
            }
        })();

    }, []);

    const attr = [
        "NAME",
        "ACRONYM",
        "DEPARTMENT"
    ];

    const onChange = async (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "name":
                setName(target.value)
                break;
            case "abbreviation":
                setAbbreviation(target.value);
                break;
        }
    };

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            name,
            abbreviation
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/courses/add-department`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                navigate(0);
            } else {
                console.log("error");
                
            }
        } catch (error) {
            console.error(error);

        }
    };

    const onClickHandler = async (data: any) => {
        setCurrentNode(data);
    };

    const onCloseModal = async () => {
        setCurrentNode(null);
    };

    return (
        <>
            <CourseModal
                hasCloseBtn={true}
                isOpen={!!currentNode}
                onClose={onCloseModal}
                data={currentNode}
                data2={departments}
            />
            <Container>

                <form method="POST" onSubmit={onSubmitHandler}>
                    <section className="flex flex-row gap-1">
                        <Input
                            title="COURSE NAME"
                            id="name"
                            onChange={onChange}
                        />
                        <Input
                            title="COURSE ABBREVIATION"
                            id="abbreviation"
                            onChange={onChange}
                        />
                        <Dropdown
                            label="DEPARTMENTS"
                            datas={departments}
                            onChange={onChange}
                        />
                    </section>

                    <section className="flex flex-auto flex-row justify-end p-5">
                        <Button>Add</Button>
                    </section>
                </form>
                <Table
                    onClickCallback={onClickHandler}
                    columns={attr}
                    datas={courses}
                />
            </Container>
        </>

    );
}