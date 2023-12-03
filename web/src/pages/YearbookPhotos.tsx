import { useEffect, useState } from "react";
import Container from "../components/Container";
import { Input } from "../components/Globals";
import Table from "../components/Table";

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
        "Year",
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
            <Input
                placeholder="Search the name of student"
            />
            <Table
                columns={attr}
                datas={students}
                onClickCallback={onClick}
            />
        </Container>
    );
}