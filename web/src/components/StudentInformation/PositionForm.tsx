import { SyntheticEvent, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import Dropdown from "../Dropdown";

import { generateYearRange as years } from "../../utilities/generateYearRange";
import ConfirmationPopup from "../ConfirmationPopup";

interface PositionFormProps {
    info: any;
    club: string;
    positions: Label[];
    onSubmitCallbackFn?: (e: SyntheticEvent) => void;
}

const PositionForm = ({ info, club, positions, onSubmitCallbackFn }: PositionFormProps) => {

    const [disabled, setDisabled] = useState<boolean>(true);
    const [displayConfirmation, setDisplayConfirmation] = useState<boolean>(false);
    const [position, setPosition] = useState<string>();
    const [yearStarted, setYearStarted] = useState<string>();
    const [yearEnded, setYearEnded] = useState<string>();

    const [data, setData] = useState<any>();

    useEffect(() => {
        setData({
            club,
            position: info.clubPositionName,
            yearStarted: info.clubStarted.toString(),
            yearEnded: info.clubEnded.toString()
        });

    }, []);

    useEffect(() => {

        if (position) {
            setData((state: any) => ({
                ...state,
                position
            }));

        }

        if (yearStarted) {
            setData((state: any) => ({
                ...state,
                yearStarted
            }));
        }

        if (yearEnded) {
            setData((state: any) => ({
                ...state,
                yearEnded
            }));
        }

    }, [position, yearStarted, yearEnded]);

    const onHandleDelete = async (event: SyntheticEvent) => {
        event.preventDefault();

        setDisplayConfirmation(true);

        if (onSubmitCallbackFn)
            onSubmitCallbackFn(event);
    };

    const onDeleteCallback = async (event: SyntheticEvent) => {
        if (onSubmitCallbackFn)
            onSubmitCallbackFn(event);

        setDisplayConfirmation(false);
    };

    const onHandleSave = async (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(true);

        if (onSubmitCallbackFn)
            onSubmitCallbackFn(event);

        console.log(position);


        const user = {
            club,
            position,
            yearStarted,
            yearEnded
        };

        let method = "PUT";
        let url = "position-update";

        if (info && info.newPosition) {
            method = "POST";
            url = "club-add";
        }

        console.log("User", user);

        await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/${url}`, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(user)
        });

        setDisabled(false);
    };

    const onHandleEdit = (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(false);
    };

    const defaultYear = years();

    return (
        <>
            {displayConfirmation && <ConfirmationPopup id={data.club} onClickCallback={onDeleteCallback} />}
            {info && <form >
                <section className="flex flex-col gap-2">
                    {data && <>
                        <Dropdown
                            label="Position"
                            defaultValue={data.position}
                            items={positions}
                            disabled={disabled}
                            callbackDropdownFn={d => {
                                setPosition(d);
                            }}
                        />
                        <Dropdown
                            label="Year Started"
                            defaultValue={data.yearStarted as string}
                            items={defaultYear}
                            disabled={disabled}
                            callbackDropdownFn={d => {
                                setYearStarted(d);
                            }}
                        />
                        <Dropdown
                            label="Year Ended"
                            defaultValue={data.yearEnded as string}
                            items={defaultYear}
                            disabled={disabled}
                            callbackDropdownFn={d => {
                                setYearEnded(d);
                            }}
                        />
                    </>}
                    <section className="flex flex-row gap-2 mt-2 justify-end">
                        {disabled ? (
                            <button
                                className="flex flex-row justify-center items-center gap-3 font-bold text-slate-100 bg-red-600  p-1 rounded"
                                onClick={onHandleEdit}
                            >
                                <p>Edit</p>
                                <AiFillEdit />
                            </button>
                        ) : (
                            <>
                                <button
                                    className="flex flex-row justify-center items-center gap-3 font-bold text-slate-100 bg-red-600  p-1 rounded"
                                    onClick={(e: SyntheticEvent) => {
                                        e.preventDefault();
                                        setDisabled(true);
                                        setData({
                                            club,
                                            position: info.clubPositionName,
                                            yearStarted: info.clubStarted,
                                            yearEnded: info.clubEnded
                                        });
                                    }}
                                    type="submit"
                                >
                                    <p>Cancel</p>
                                </button>
                                <button
                                    className="flex flex-row justify-center items-center gap-3 font-bold text-slate-100 bg-red-600 p-1 rounded"
                                    onClick={onHandleDelete}
                                    type="submit"
                                >
                                    <p>Delete</p>
                                    <FaTrash />
                                </button>
                                <button
                                    className="flex flex-row justify-center items-center gap-3 font-bold text-slate-100 bg-red-600 p-1 rounded"
                                    onClick={onHandleSave}
                                    type="submit"
                                >
                                    <p>Save</p>
                                    <AiFillSave />
                                </button>
                            </>
                        )}

                    </section>
                </section>
            </form>}
        </>

    );
};

export default PositionForm;