import { SyntheticEvent, useEffect, useState } from "react";
import { Input, Dropdown, Button, Table, Container } from "../Globals";
import { useNavigate } from "react-router-dom";
import ClubsModal from "./Clubs/ClubsModal";

export default function () {

    const [name, setName] = useState<string>("");

    const [clubs, setClubs] = useState<any[]>([]);
    const [currentNode, setCurrentNode] = useState<any>();

    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            try {

                const clubs = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs`);
                const clubsData = await clubs.json();

                console.log(clubsData);

                if (clubsData) {
                    setClubs(clubsData.organizations);
                }

            } catch (error) {
                console.error(error);
            }
        })();

    }, []);

    const onSubmitHandler = async (event: SyntheticEvent) => {
        const data = {
            name
        };

        try {

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/add-new-club`, {
                method: "POST",
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

    const onChange = async (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "name":
                setName(target.value);
                break;
        }
    };

    const onClickHandler = async (data: any) => {
        
        console.log(data);
        
        setCurrentNode(data)
    };

    const onCloseModal = async () => {
        setCurrentNode(null);
    };


    const attr = [
        "CLUB/ORGANIZATION NAME"
    ];

    return (
        <Container>
            <ClubsModal
                hasCloseBtn={true}
                isOpen={!!currentNode}
                onClose={onCloseModal}
                data={currentNode}
            />

            <form method="POST" onSubmit={onSubmitHandler}>
                <section className="flex flex-row gap-1">
                    <Input
                        title="CLUB/ORGANIZATION NAME"
                        id="name"
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
                datas={clubs}
            />
        </Container>
    );
}