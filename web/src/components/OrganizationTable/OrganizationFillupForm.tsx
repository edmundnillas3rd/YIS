import { useState, SyntheticEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import {
    Dropdown,
    Button,
    Confirm,
    Spinner,
    Toggle
} from "../Globals";
import { generateYearRange } from "../../utilities/generateYearRange";

export default function ({ data, data2, hasSubmit }: any) {
    const [positions, setPositions] = useState<any[]>([]);
    const [organizations, setOrganizations] = useState([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>();

    const [confirmSave, setConfirmSave] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    const [club, setClub] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [yearStarted, setYearStarted] = useState<string>("");
    const [yearEnded, setYearEnded] = useState<string>("");
    const navigate = useNavigate();
    const years = generateYearRange();

    useEffect(() => {
        if (data?.positions && data?.organizations) {
            setPositions(data.positions);
            setOrganizations(data.organizations);
        }

        if (data2) {
            const { id, position, yearStarted, yearEnded } = data2;

            if (!id && !position && !yearStarted && !yearEnded) {
                setClub(id);
                setPosition(positions[0]?.id);
                setYearStarted(years[0].toString());
                setYearEnded(years[0].toString());
                return;
            }

            setClub(id);
            setPosition(position);
            setYearStarted(yearStarted);
            setYearEnded(yearEnded);
        }

    }, [data, data2, positions]);

    const onChange = async (event: SyntheticEvent) => {
        setErrMessage("");
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
            
            const newData = {
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
                    body: JSON.stringify(newData)
                });

                if (response.ok) {
                    
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
                    
                    setLoading(false);
                    navigate(0);
                }
            }
        } else {
            setErrMessage("Unable to submit data, please fill in the required data");

        }

        setLoading(false);
    };

    const onClickSave = async (event: SyntheticEvent) => {
        event.preventDefault();
        setConfirmSave(false);
        onSubmitHandler(event);
    };

    const onClickDelete = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/${club}/user-organization-remove`, {
            credentials: "include",
            method: "DELETE"
        });
        if (response.ok) {
            
            navigate(0);
        }
    };

    const onEditChange = (state: any) => {
        setDisable(!state);
        setConfirmDelete(false);
        setConfirmSave(false);
    };

    return (
        <>
            {data && data2 &&
                <section
                    className="flex flex-col gap-5 mb-5"
                >
                    {errMessage && <p className="font-bold text-red-600">{errMessage}</p>}

                    <Dropdown
                        label="Position"
                        name="position"
                        onChange={onChange}
                        disabled={disable}
                        datas={positions}
                        value={position}
                    />
                    <Dropdown
                        label="Year Started"
                        name="yearStarted"
                        onChange={onChange}
                        disabled={disable}
                        datas={years}
                        value={yearStarted}
                    />
                    <Dropdown
                        label="Year Ended"
                        name="yearEnded"
                        onChange={onChange}
                        disabled={disable}
                        datas={years}
                        value={yearEnded}
                    />
                    {!loading ? (
                        <Toggle name={`${typeof hasSubmit === "boolean" && !hasSubmit ? "Submit" : "Edit"}`} icon={<MdEdit />} onChange={onEditChange}>
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