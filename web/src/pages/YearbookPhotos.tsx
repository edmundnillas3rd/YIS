import { SyntheticEvent, useEffect, useState } from "react";
import { Input, Table, Container, Button } from "../components/Globals";
import { v4 as uuid } from "uuid";
import YearbookPhotosModal from "../components/YearbookPhotos/YearbookPhotosModal";
import { searchStudentYearbookPhotoStatus } from "../utilities/students";

export default function () {

    const [students, setStudents] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);
    const [displayStatus, setDisplayStatus] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const userRes = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);
            const yearbookRes = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks`);
            const [userData, yearbookData] = await Promise.all([userRes.json(), yearbookRes.json()]);

            const { yearbookPhotos, yearbookStatuses } = yearbookData;

            const formattedData = yearbookPhotos.map((yearbook: any) => ({ uuid: uuid(), ...yearbook }));
            console.log(yearbookPhotos);
            

            setStudents(formattedData);


            const formattedStatusData = yearbookStatuses.map((statuses: any) => ({ uuid: uuid(), ...statuses }));

            setStatuses(formattedStatusData);
        })();
    }, []);

    const attr = [
        "FULL NAME",
        "FULL PAYMENT",
        "PAYMENT STATUS",
        "YEARBOOK PHOTOS STATUS",
        "DATE RELEASED"
    ];

    const onClick = async (data: any) => {
        setCurrentNode(data);
        setDisplayStatus(true);
    };

    const onCloseStatus = () => {
        setCurrentNode(null);
        setDisplayStatus(false);
    };

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = await searchStudentYearbookPhotoStatus(search);
        setStudents(data.map((student: any) => ({ uuid: uuid(), ...student })));
    };

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "searchStudent":
                setSearch(target.value);
                break;
        }
    };

    return (
        <>
            <YearbookPhotosModal
                hasCloseBtn={true}
                isOpen={displayStatus}
                onClose={onCloseStatus}
                data={currentNode}
                data2={statuses}
            />
            <Container>
                <form className="flex flex-row items-center gap-1" onSubmit={onSubmitHandler}>
                    <Input
                        placeholder="Search the name of student"
                        id="searchStudent"
                        onChange={onChange}
                        width="flex-auto"
                    />
                    <Button type="submit">Search</Button>
                </form>
                {students && (
                    <Table
                        columns={attr}
                        datas={students}
                        buttonRowName="View"
                        onClickCallback={onClick}
                    />
                )
                }
            </Container>
        </>
    );
}