import { SyntheticEvent, useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";

import { Button } from "../Globals";
import Modal from "../Modal";
import OrganizationFillupForm from "./OrganizationFillupForm";

interface Position {
    club: string;
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
    const [errMessage, setErrMessage] = useState<string>();
    const [club, setClub] = useState();

    useEffect(() => {

        if (!data || !data2)
            return;

        (async () => {
            const { id } = data2;
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/${id}/user-club-info`, {
                credentials: "include"
            });

            const data = await response.json();
            if (response.ok) {
                setPositions(data.userClubPositions);
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

        setPositions(state => ([
            ...state, {
                club: data2['id'],
                position: "",
                yearStarted: "",
                yearEnded: "",
                submitted: false
            }

        ]));
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            {positions && positions.map((position: any) => (
                <OrganizationFillupForm
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