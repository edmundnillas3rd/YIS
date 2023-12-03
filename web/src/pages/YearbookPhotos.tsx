import { useEffect, useState } from "react";
import { Input, Table, Container } from "../components/Globals";

export default function () {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);
            const data = await response.json();

            if (data?.studentUsers) {
                setStudents(data.studentUsers);
            }
        })();
    }, []);

    const attr = [
        "Course",
        "Full Name"
    ];

    const datas = [
        {
            id: "1",
            year: "3RD",
            course: "COMPUTER SCIENCE",
            fullname: "EDMUND NILLAS III"
        }
    ];

    const onClick = async (data: any) => {

    };

    return (
        <Container>
            <section className="flex flex-row">
                <Input
                    placeholder="Search the name of student"
                />
            </section>
            <Table
                columns={attr}
                datas={students}
                buttonRowName="View"
                onClickCallback={onClick}
            />
        </Container>
    );
}