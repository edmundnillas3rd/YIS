import { SyntheticEvent, useEffect, useState } from "react";
import { Input, Dropdown, Button, Table, Container } from "../Globals";
import { useNavigate } from "react-router-dom";
import ClubsModal from "./Clubs/ClubsModal";
import PositionsModal from  "./Clubs/PositionsModal";

export default function () {

    const [name, setName] = useState<string>("");

    const [clubs, setClubs] = useState<any[]>([]);
    const [positions, setPositions] = useState<any[]>([]);
    const [currentNode, setCurrentNode] = useState<any>();
    const [currentPosNode, setCurrentPosNode] = useState<any>();

    const [positionName, setPositionName] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            try {

                const clubs = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs`);
                const clubsData = await clubs.json();

                

                if (clubsData) {
                    setClubs(clubsData.organizations);
                    setPositions(clubsData.positions);
                }

            } catch (error) {
                console.error(error);
            }
        })();

    }, []);

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
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

    const onSubmitHandlerPositions = async (event: SyntheticEvent) => {
        event.preventDefault();
        const data = {
            positionName
        };

        try {

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/add-new-position`, {
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
            case "positionName":
                setPositionName(target.value);
                break;
        }
    };

    const onClickHandler = async (data: any) => {
        
        setCurrentNode(data);
    };

    const onClickPosHandler = async (data: any) => {
        
        setCurrentPosNode(data);
    };

    const onCloseModal = async () => {
        setCurrentNode(null);
        setCurrentPosNode(null);
    };


    const attr = [
        "CLUB/ORGANIZATION NAME"
    ];

    const posAttr = [
        "POSITION NAME"
    ];

    return (
        <Container>
            <ClubsModal
                hasCloseBtn={true}
                isOpen={!!currentNode}
                onClose={onCloseModal}
                data={currentNode}
            />
             <PositionsModal
                hasCloseBtn={true}
                isOpen={!!currentPosNode}
                onClose={onCloseModal}
                data={currentPosNode}
            />
            <form method="POST" onSubmit={onSubmitHandler}>
                <h1>Add New Clubs</h1>
                <section className="flex flex-row gap-1">
                    <Input
                        title="CLUB/ORGANIZATION NAME"
                        id="name"
                        onChange={onChange}
                        required
                    />
                </section>
                <section className="flex flex-auto flex-row justify-end p-5">
                    <Button>Add</Button>
                </section>
            </form>
            <Table
                key={clubs.length}
                onClickCallback={onClickHandler}
                columns={attr}
                datas={clubs}
            />

            <form method="POST" onSubmit={onSubmitHandlerPositions}>
                <h1>Add New Positions</h1>
                <section className="flex flex-row gap-1">
                    <Input
                        title="POSITION NAME"
                        id="positionName"
                        onChange={onChange}
                        
                    />
                </section>
                <section className="flex flex-auto flex-row justify-end p-5">
                    <Button>Add</Button>
                </section>
            </form>
            <Table
                key={positions.length}
                onClickCallback={onClickPosHandler}
                columns={posAttr}
                datas={positions}
            />
        </Container>
    );
}