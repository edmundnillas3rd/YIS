import { SyntheticEvent, useEffect, useState } from "react";
import { Input, Table, Container, Button } from "../components/Globals";
import { v4 as uuid } from "uuid";
import YearbookPhotosModal from "../components/YearbookPhotos/YearbookPhotosModal";
import { searchStudentYearbookPhotoStatus } from "../utilities/students";
import YearbookPhotosAdd from "../components/YearbookPhotos/YearbookPhotosAdd";

export default function () {

    const [students, setStudents] = useState<any>(null);
    const [searchedData, setSearchedData] = useState<any>(null);
    const [statuses, setStatuses] = useState();
    const [paymentStatuses, setPaymentStatus] = useState();
    const [currentNode, setCurrentNode] = useState(null);
    const [displayStatus, setDisplayStatus] = useState<boolean>(false);
    const [displayYearbookPhotosModal, setDisplayYearbookPhotosModal] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const userRes = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);
            const yearbookRes = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks`);
            const [userData, yearbookData] = await Promise.all([userRes.json(), yearbookRes.json()]);

            const { yearbookPhotos, yearbookStatuses, yearbookPaymentStatuses } = yearbookData;

            const formattedData = yearbookPhotos.map((yearbook: any) => ({ uuid: uuid(), ...yearbook }));

            setStudents(formattedData);
            setSearchedData(formattedData);


            const formattedStatusData = yearbookStatuses.map((statuses: any) => ({ uuid: uuid(), ...statuses }));
            const formattedPaymentStatusData = yearbookPaymentStatuses.map((statuses: any) => ({ uuid: uuid(), ...statuses }));

            setStatuses(formattedStatusData);
            setPaymentStatus(formattedPaymentStatusData);
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
        // setStudents(data.map((student: any) => ({ uuid: uuid(), ...student })));
        setSearchedData(data.map((student: any) => ({ uuid: uuid(), ...student })));

    };

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();
        setSearchedData(students);
        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "searchStudent":
                setSearch(target.value);
                break;
        }
    };

    const onCloseYearbookPhotoAdd = async () => {
        setDisplayYearbookPhotosModal(false);
    };



    return (
        <>
            {statuses && paymentStatuses && (
                <>
                    <YearbookPhotosModal
                        hasCloseBtn={true}
                        isOpen={displayStatus}
                        onClose={onCloseStatus}
                        data={currentNode}
                        data2={statuses}
                    />
                    <YearbookPhotosAdd
                        hasCloseBtn={true}
                        isOpen={displayYearbookPhotosModal}
                        onClose={onCloseYearbookPhotoAdd}
                        data={statuses}
                        data2={paymentStatuses}
                    />
                </>
            )}
            <Container>
                <section className="flex flex-row gap-1">

                    <form className="flex flex-row flex-auto items-center gap-1" onSubmit={onSubmitHandler}>
                        <Input
                            placeholder="Search the name of student"
                            id="searchStudent"
                            onChange={onChange}
                            width="flex-auto"
                        />
                        <Button type="submit">Search</Button>
                    </form>
                    <Button onClick={(e: SyntheticEvent) => {
                        e.preventDefault();
                        setDisplayYearbookPhotosModal(true);
                    }}>Add</Button>
                </section>
                {searchedData && (
                    <Table
                        key={searchedData.length}
                        columns={attr}
                        datas={searchedData}
                        buttonRowName="View"
                        onClickCallback={onClick}
                    />
                )
                }
            </Container>
        </>
    );
}