import { SyntheticEvent, useEffect, useState } from "react";
import { AiFillSave } from "react-icons/ai";

import Dropdown from "../Dropdown";

export default function FillFormPopup({ name, data, onClickCallback }: PopupModalProps) {
    const [errMessage, setErrMessage] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);
    const [clubAttr, setClubsAttr] = useState<ClubAttr>();
    const [club, setClub] = useState<string>();

    useEffect(() => {

        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs`);
            const data = await response.json();

            const p = data.positions.map(({ club_position_id, club_position_name }: Position) => ({ id: club_position_id, name: club_position_name }));
            const o = data.organizations.map(({ club_organization_id, club_organization_name }: Organization) => ({ id: club_organization_id, name: club_organization_name }));

            console.log(p);
            

            setClubsAttr({
                positions: p,
                organizations: o
            });
            console.log(o);
            
        })();
    }, []);


    const onSelectClub = async (data: any) => {
        setClub(data);
    };

    const onHandleSave = async (event: SyntheticEvent) => {
        setDisabled(true);

        event.preventDefault();

        const data = {
            club,
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/club-add`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const { error } = await response.json();

        if (response.ok) {
            onClickCallback(event);
        } else if (error) {
            setErrMessage(error);
        }

        setDisabled(false);
    };

    return <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
        <section className="bg-white border border-zinc-400 rounded flex flex-col md:w-1/2 p-10 gap-2">
            <section className="flex flex-row items-center justify-between gap-5">
                <section className="flex flex-col justify-center">
                    <h3 className="font-bold">{name}</h3>
                </section>
            </section>

            <form className="flex flex-col gap-2">
                {clubAttr && <Dropdown label="Clubs/Organization" items={clubAttr.organizations} callbackDropdownFn={onSelectClub} disabled={disabled} />}
                {/* {clubAttr && <Dropdown label="Positions" items={clubAttr.positions} callbackDropdownFn={onSelectPosition} />} */}
                {/* <Dropdown label="Year Started" items={years(defaultYear) as []} callbackDropdownFn={onYearStartHandler}/> */}
                {/* <Dropdown label="Year Ended" items={years(defaultYear + 4) as []} callbackDropdownFn={onYearEndHandler}/> */}
                <section className="flex flex-row pt-5 gap-2 justify-end items-center">
                    {errMessage && <p className="ml-5 text-red-400 text-sm font-bold">{errMessage}</p>}
                    <button
                        className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded"
                        onClick={onClickCallback}
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
                </section>
            </form>
        </section>

    </section>;
}