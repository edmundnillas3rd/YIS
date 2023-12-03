import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Button,
    Dropdown,
    Modal,
    Spinner
} from "../Globals";
import { generateYearRange } from "../../utilities/generateYearRange";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
    data
}: ModalProps) {
    const [positions, setPositions] = useState();
    const [organizations, setOrganizations] = useState();

    const [loading, setLoading] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>();


    const [club, setClub] = useState<string>();
    const [position, setPosition] = useState<string>();
    const [yearStarted, setYearStarted] = useState<string>();
    const [yearEnded, setYearEnded] = useState<string>();
    const navigate = useNavigate();
    const years = generateYearRange();

    useEffect(() => {
        if (data) {
            setPositions(data['positions']);
            setOrganizations(data['organizations']);

            setPosition(data['positions'][0]['id']);
            setClub(data['organizations'][0]['id']);
            setYearStarted("2000");
            setYearEnded("2000");
        }
    }, [data]);

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        switch (target.name) {
            case "club":
                setClub(target.value);
                break;
            case "position":
                setPosition(target.value);
                break;
            case "yearStarted":
                setYearStarted(target.value);
                break;
            case "yearEnded":
                setYearEnded(target.value);
                break;
        }

    };

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);

        if (club && position && yearStarted && yearEnded) {
            const data = {
                club,
                position,
                yearStarted,
                yearEnded
            };

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/club-add`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("Successfully added a new club entry");
                navigate(0);
            } else {
                const { error } = await response.json();
                setErrMessage(error);
            }
            setLoading(false);
        } else {
            setErrMessage("Please fill up all required fields");
        }

        setLoading(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <form
                onSubmit={onSubmitHandler}
                method="POST"
                className="flex flex-col gap-5"
            >
                <Dropdown
                    label="Club & Organizations"
                    name="club"
                    onChange={onChange}
                    disabled={loading}
                    datas={organizations}
                />
                <Dropdown
                    label="Position"
                    name="position"
                    onChange={onChange}
                    disabled={loading}
                    datas={positions}
                />
                <Dropdown
                    label="Year Started"
                    name="yearStarted"
                    onChange={onChange}
                    disabled={loading}
                    datas={years}
                />
                <Dropdown
                    label="Year Ended"
                    name="yearEnded"
                    onChange={onChange}
                    disabled={loading}
                    datas={years}
                />
                <section className="flex flex-row justify-end items-center gap-5">
                    {errMessage && <p className="font-bold text-red-600">{errMessage}</p>}
                    <Button type="submit" disabled={loading}>
                        {loading ? <Spinner /> : "Submit"}
                    </Button>
                </section>
            </form>
        </Modal>
    );
}