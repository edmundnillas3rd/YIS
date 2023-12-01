import { useState, SyntheticEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import { Dropdown, Button } from "../Globals";
import { generateYearRange } from "../../utilities/generateYearRange";

import Confirm from "../Confirm";
import Spinner from "../Spinner";
import Toggle from "../Toggle";

export default function ({ data, data2, hasSubmit }: any) {
    const [positions, setPositions] = useState();
    const [organizations, setOrganizations] = useState();

    const [loading, setLoading] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>();

    const [confirmSave, setConfirmSave] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    const [club, setClub] = useState<string>();
    const [position, setPosition] = useState<string>();
    const [yearStarted, setYearStarted] = useState<string>();
    const [yearEnded, setYearEnded] = useState<string>();
    const navigate = useNavigate();
    const years = generateYearRange();

    useEffect(() => {
        if (data2?.club) {
            setClub(data2.club);
        }
    }, []);

    useEffect(() => {
        if (data?.positions && data?.organizations) {
            setPositions(data.positions);
            setOrganizations(data.organizations);
        }

        if (data2?.club && data2?.position && data2?.yearStarted && data2.yearEnded) {

            setClub(data2.club);
            setPosition(data2.position);
            setYearStarted(data2.yearStarted);
            setYearEnded(data2.yearEnded);
        }

    }, [data, data2]);

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
        console.log(club, position, yearStarted, yearEnded);


        if (club && position && yearStarted && yearEnded) {
            const data = {
                club,
                position,
                yearStarted,
                yearEnded
            };

            if (typeof hasSubmit === "boolean" && !hasSubmit) {

                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/position-add`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    console.log("Successfully updated a add club position entry");
                    setLoading(false);
                    navigate(0);
                }

            } else {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/position-update`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    console.log("Successfully updated a club entry");
                    setLoading(false);
                    navigate(0);
                }
            }
        }

        setLoading(false);
    };

    const onClickSave = async (event: SyntheticEvent) => {
        event.preventDefault();
        await onSubmitHandler(event);
    };

    const onClickDelete = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/${club}/user-organization-remove`, {
            credentials: "include",
            method: "DELETE"
        });
        if (response.ok) {
            console.log("Successfully delete club/organization entry");
            navigate(0);
        }
    };

    const onEditChange = (state: any) => {
        setConfirmDelete(false);
        setConfirmSave(false);
    };

    return (
        <>
            {data && data2 &&
                <section
                    className="flex flex-col gap-5 mb-5"
                >
                    <Dropdown
                        label="Position"
                        name="position"
                        onChange={onChange}
                        disabled={loading}
                        datas={positions}
                        value={position}
                    />
                    <Dropdown
                        label="Year Started"
                        name="yearStarted"
                        onChange={onChange}
                        disabled={loading}
                        datas={years}
                        value={yearStarted}
                    />
                    <Dropdown
                        label="Year Ended"
                        name="yearEnded"
                        onChange={onChange}
                        disabled={loading}
                        datas={years}
                        value={yearEnded}
                    />
                    {!loading ? (
                        <Toggle name="Edit" icon={<MdEdit />} onChange={onEditChange}>
                            {(!confirmSave && !confirmDelete) && (
                                <>
                                    <Button onClick={(e: any) => { setConfirmDelete(true); }}>
                                        Delete
                                        <MdDelete />
                                    </Button>
                                    <Button onClick={(e: any) => { setConfirmSave(true); }}>
                                        Save
                                        <FaSave />
                                    </Button>
                                </>
                            )}
                            {confirmSave && (
                                <Confirm
                                    onConfirm={onClickSave}
                                    onCancel={(e: any) => setConfirmSave(false)}
                                />
                            )}
                            {confirmDelete && (
                                <Confirm
                                    onConfirm={onClickDelete}
                                    onCancel={(e: any) => setConfirmDelete(false)}
                                />
                            )}
                        </Toggle>
                    ) : (
                        <section className="flex flex-row justify-end">
                            <Button disabled={true}>
                                <Spinner />
                            </Button>
                        </section>
                    )
                    }
                </section>}
        </>

    );
}