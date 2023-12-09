import { SyntheticEvent, useEffect, useState } from "react";
import { Input, Table, Container } from "../components/Globals";
import { v4 as uuid } from "uuid";
import YearbookPhotosModal from "../components/YearbookPhotos/YearbookPhotosModal";

export default function () {

    const [students, setStudents] = useState([]);
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

            if (userData && yearbookData) {
                const { yearbooks, yearbookStatuses } = yearbookData;

                const formattedData = yearbooks.map((yearbook: any) => ({ uuid: uuid(), ...yearbook }));


                setStudents(formattedData);


                const formattedStatusData = yearbookStatuses.map((statuses: any) => ({ uuid: uuid(), ...statuses }));

                setStatuses(formattedStatusData);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}`)
        })();
    }, [search])

    const attr = [
        "Full Name",
        "Yearbook Photo Status",
        "Date Released"
    ];

    const onClick = async (data: any) => {
        setCurrentNode(data);
        setDisplayStatus(true);
    };

    const onCloseStatus = () => {
        setCurrentNode(null);
        setDisplayStatus(false);
    };

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "searchStudent":
                setSearch(target.value);
                break;
        }
    }

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
                <section className="flex flex-row">
                    <Input
                        placeholder="Search the name of student"
                        id="searchStudent"
                        onChange={onChange}
                    />
                </section>
                <Table
                    columns={attr}
                    datas={students}
                    buttonRowName="View"
                    onClickCallback={onClick}
                />
            </Container>
        </>
    );
}