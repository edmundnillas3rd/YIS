import { SyntheticEvent, useState, useEffect } from "react";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import Dropdown from "../Dropdown";

import { generateYearRange as years } from "../../utilities/generateYearRange";

interface PositionFormProps {
    info: any;
    club: string;
    positions: Label[];
    onSubmitCallbackFn?: (e: SyntheticEvent) => void;
}

const PositionForm = ({ info, club, positions, onSubmitCallbackFn }: PositionFormProps) => {

    const [disabled, setDisabled] = useState<boolean>(true);
    const [position, setPosition] = useState<string>();
    const [yearStarted, setYearStarted] = useState<string>();
    const [yearEnded, setYearEnded] = useState<string>();

    const [positionInfo, setPositionInfo] = useState<any>();

    useEffect(() => {
        setPositionInfo({
            clubPositionName: info.clubPositionName,
            clubStarted: info.clubStarted,
            clubEnded: info.clubEnded
        });

        console.log(info);
        

    }, []);

    const onHandleSave = async (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(true);

        if (onSubmitCallbackFn)
            onSubmitCallbackFn(event);
        return;

        // TODO: To add clubs route
        const data = {
            club,
            position,
            yearStarted,
            yearEnded
        };

        await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/position-add`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data)
        });

        setDisabled(false);
    };

    const onHandleEdit = (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(false);
    };

    const defaultYear = years(2001);

    return (
        <>
            {info && <form >
                <section className="flex flex-col gap-2">
                    {positionInfo && <>
                        <Dropdown
                            label="Position"
                            defaultValue={positionInfo.clubPositionName}
                            items={positions}
                            disabled={disabled}
                            callbackDropdownFn={data => {
                                setPosition(data);
                            }}
                        />
                        <Dropdown
                            label="Year Started"
                            defaultValue={positionInfo.clubStarted as string}
                            items={defaultYear}
                            disabled={disabled}
                            callbackDropdownFn={data => {
                                setYearStarted(data.name);
                            }}
                        />
                        <Dropdown
                            label="Year Ended"
                            defaultValue={positionInfo.clubEnded as string}
                            items={defaultYear}
                            disabled={disabled}
                            callbackDropdownFn={data => {
                                setYearEnded(data.name);
                            }}
                        />
                    </>}
                    <section className="flex flex-row gap-2 mt-2 justify-end">
                        {disabled ? (
                            <button
                                className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded"
                                onClick={onHandleEdit}
                            >
                                <p>Edit</p>
                                <AiFillEdit style={{
                                    color: "#475569"
                                }} />
                            </button>
                        ) : (
                            <>
                                <button
                                    className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded"
                                    onClick={(e: SyntheticEvent) => {
                                        e.preventDefault();
                                        setDisabled(true);

                                    }}
                                    type="submit"
                                >
                                    <p>Cancel</p>
                                </button>
                                <button
                                    className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded"
                                    onClick={onHandleSave}
                                    type="submit"
                                >
                                    <p>Save</p>
                                    <AiFillSave style={{
                                        color: "#475569"
                                    }} />
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