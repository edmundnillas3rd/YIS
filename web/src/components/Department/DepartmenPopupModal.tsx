import { Key, SyntheticEvent, useEffect, useState } from "react";
import { AiFillEdit, AiFillSave, AiOutlinePlus } from "react-icons/ai";
import Dropdown from "../Dropdown";

import { generateYearRange as years } from "../../utilities/generateYearRange";

interface PositionFormProps {
    info?: any;
    club: string;
    positions: Label[];
    onSubmitCallbackFn?: (e: SyntheticEvent) => void;
}

const PositionForm = ({ info, club, positions, onSubmitCallbackFn }: PositionFormProps) => {

    const [disabled, setDisabled] = useState<boolean>(true);
    const [position, setPosition] = useState<string>();
    const [yearStarted, setYearStarted] = useState<string>();
    const [yearEnded, setYearEnded] = useState<string>();

    useEffect(() => {
        if (info) {
            setPosition(info.club_position_name);
            setYearStarted(info.club_started);
            setYearEnded(info.club_ended);
        }
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

    const defaultYear = 2001;

    return (
        <form >
            <section className="flex flex-col gap-2">
                <Dropdown
                    label="Position"
                    defaultValue={`${position}`}
                    items={positions}
                    disabled={disabled}
                    callbackDropdownFn={data => {
                        setPosition(data);
                    }}
                />
                <Dropdown
                    label="Year Started"
                    defaultValue={yearStarted}
                    items={years(defaultYear)}
                    disabled={disabled}
                    callbackDropdownFn={data => {
                        setYearStarted(data.name);
                    }}
                />
                <Dropdown
                    label="Year Ended"
                    defaultValue={yearEnded}
                    items={years(defaultYear + 4)}
                    disabled={disabled}
                    callbackDropdownFn={data => {
                        setYearEnded(data.name);
                    }}
                />
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
        </form>
    );
};

export default function DepartmenPopupModal({ data, onClickCallback }: PopupModalProps) {
    const [clubAttr, setClubAttr] = useState<ClubAttr>();
    const [positionForms, setPositionForms] = useState<React.ReactNode[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>("");
    const [clubPositions, setClubPositions] = useState<any[]>();

    useEffect(() => {

        (async () => {
            const clubAttrResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs`, {
                credentials: "include"
            });
            const clubAttrData = await clubAttrResponse.json();

            const userClubPositionResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/${data.id}/user-club-info`, {
                credentials: "include"
            });

            const userClubPositionData = await userClubPositionResponse.json();

            const [clubAttributes, clubInfo] = await Promise.all([clubAttrData, userClubPositionData]);

            const organizations = clubAttributes.organizations.map(({ club_organization_id, club_organization_name }: Organization) => ({ id: club_organization_id, name: club_organization_name }));
            const positions = clubAttributes.positions.map(({ club_position_id, club_position_name }: Position) => ({ id: club_position_id, name: club_position_name }));
            setClubAttr({
                organizations,
                positions
            });

            setSubmitted(true);
            setErrMessage("");

            setClubPositions(clubInfo.userClubPositions);
            setPositionForms(clubInfo.userClubPositions.map((position: any, i: number) => <PositionForm key={i} info={position} club={data} positions={positions} onSubmitCallbackFn={onSubmitHandler} />));


        })();
    }, []);

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_BASE_URL}/clubs`, {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                setErrMessage("");
                setSubmitted(true);
            });
    };

    const onClickAddPosition = (event: SyntheticEvent) => {
        event.preventDefault();

        if (!submitted && positionForms.length > 0) {
            setErrMessage("Fill in the details first before adding new");
            return;
        }

        const key = positionForms.length + 100;
        if (clubAttr && positionForms.length !== 2) {
            setPositionForms((state) => ([
                ...state,
                <PositionForm key={key} club={data} positions={clubAttr.positions} onSubmitCallbackFn={onSubmitHandler} />
            ]));
            setSubmitted(false);
        }
    };

    return (
        <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
            <section className="bg-white border border-zinc-400 rounded flex flex-col w-11/12 md:w-1/2 p-10 gap-2 ">
                <section className="flex flex-row items-center justify-between gap-5">
                    <section className="flex flex-col justify-center">
                        <h3 className="font-bold">Club Organization Information</h3>
                        <h3 className="font-bold mt-5 text-gray-500">{data.organization}</h3>
                    </section>
                    <section className="font-bold p-2 flex flex-row cursor-pointer hover:bg-zinc-300 hover:rounded" onClick={onClickCallback}>X</section>
                </section>
                <section className="flex flex-col h-96 overflow-y-scroll">

                    {
                        positionForms.map((pf, i) => (
                            <>
                                <p className="font-bold mt-5 " key={i + 500} >Position #{i + 1}</p>
                                {pf}
                            </>
                        ))
                    }
                </section>
                <section className="flex flex-row pt-5 gap-2 justify-end items-center">
                    {errMessage && <p className="text-red-400 font-bold text-xs">{errMessage}</p>}
                    <button className="flex flex-row justify-center items-center gap-3 font-bold border text-slate-600 border-zinc-600 p-1 rounded"
                        onClick={onClickCallback}>
                        <p>Cancel</p>
                    </button>
                    <button className="flex flex-row flex-shrink-0 justify-center items-center gap-3 font-bold border text-slate-600 border-zinc-600 p-1 rounded"
                        onClick={onClickAddPosition}>
                        <p>Add Positions</p>
                        <AiOutlinePlus style={{
                            color: "#475569"
                        }} />
                    </button>
                </section>
            </section>

        </section>
    );
}