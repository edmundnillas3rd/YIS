import { SyntheticEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { FaCirclePlus } from "react-icons/fa6";

import { Button, Modal } from "../Globals";
import OrganizationFillupForm from "./OrganizationFillupForm";

interface Position {
    id: string;
    position: string;
    yearStarted: string;
    yearEnded: string;
    submitted?: boolean;
}

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
    data,
    data2
}: ModalProps) {
    const [positions, setPositions] = useState<Position[]>([]);
    const [errMessage, setErrMessage] = useState<string>("");
    const [club, setClub] = useState<string>("");

    useEffect(() => {
        if (!data && !data2)
            return;

        (async () => {

            if (data2) {
                const { id } = data2;
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/${id}/user-club-info`, {
                    credentials: "include"
                });

                const data = await response.json();

                if (data) {
                    setClub(id);
                    setPositions(data.userClubPositions.map((pos: any) => ({ uuid: uuid(), ...pos })));
                }
            }
        })();
    }, [data, data2]);

    const onClickAdd = async (event: SyntheticEvent) => {
        event.preventDefault();

        const result = positions.find((position: any) => position.submitted === false);

        if (result !== undefined) {
            setErrMessage("Please fill up the previous form first");
            return;
        }

        if (data2) {
            setPositions(state => ([
                ...state, {
                    id: club,
                    position: "",
                    yearStarted: "",
                    yearEnded: "",
                    submitted: false
                }

            ]));
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            {positions.length && positions.map((position: any) => (
                <OrganizationFillupForm
                    key={position.uuid}
                    data={data}
                    data2={position}
                    hasSubmit={position?.submitted}
                />
            ))}
            <section className="flex flex-row items-center justify-end gap-1">
                {errMessage && <p className="font-bold text-red-600">{errMessage}</p>}
                <Button onClick={onClickAdd}>
                    Add Position
                    <FaCirclePlus />
                </Button>
            </section>
        </Modal>
    );
}