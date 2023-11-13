import { SyntheticEvent, useEffect, useState } from "react";
import { AiFillSave } from "react-icons/ai";

import Dropdown from "../Dropdown";

export default function FillFormPopup({ name, data, onClickCallback }: PopupModalProps) {
    const [highlight, setHighlight] = useState("#475569");
    const [disabled, setDisabled] = useState<boolean>(true);
    const [clubAttr, setClubsAttr] = useState<ClubAttr>();
    const [club, setClub] = useState<string>();
    const [position, setPosition] = useState<string>();
    const [yearStart, setYearStart] = useState();
    const [yearEnd, setYearEnd] = useState();
    const defaultYear = 2001;

    useEffect(() => {

        fetch(`${import.meta.env.VITE_BASE_URL}/clubs`)
            .then(response => response.json())
            .then(data => {

                const positions = data.positions.map(({ club_position_id, club_position_name }: Position) => ({ id: club_position_id, name: club_position_name }));
                const organizations = data.organizations.map(({ club_organization_id, club_organization_name }: Organization) => ({ id: club_organization_id, name: club_organization_name }));

                setClubsAttr({
                    positions,
                    organizations
                });
            });
    }, []);


    const years = (startYear: number) => {
        const currentYear = new Date().getFullYear();
        const years = [];
        startYear = startYear || 2000;
        let id = 0;
        while (startYear <= currentYear) {
            years.push({ id: startYear++, name: `${startYear++}`});
        }

        return years;
    }

    const onSelectClub= async (data: any) => {
        setClub(data);
    };

    const onSelectPosition = async (data: any) => {
        setPosition(data);
    };

    const onYearStartHandler = async (data: any) => {
        setYearStart(data);
    }

    const onYearEndHandler = async (data: any) => {
        setYearEnd(data);
    }

    const onHandleSave = async (event: SyntheticEvent) => {
        setDisabled(true);

        event.preventDefault();

        const data = {
            club,
            position,
            yearStart,
            yearEnd
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/club-add`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            onClickCallback(event);
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
                {clubAttr && <Dropdown label="Clubs/Organization" items={clubAttr.organizations} callbackDropdownFn={onSelectClub} />}
                {clubAttr && <Dropdown label="Positions" items={clubAttr.positions} callbackDropdownFn={onSelectPosition} />}
                <Dropdown label="Year Started" items={years(defaultYear) as []} callbackDropdownFn={onYearStartHandler}/>
                <Dropdown label="Year Ended" items={years(defaultYear + 4) as []} callbackDropdownFn={onYearEndHandler}/>
                <section className="flex flex-row pt-5 gap-2 justify-end items-center">
                    <button
                        className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded hover:text-slate-100 hover:bg-slate-900"
                        onClick={onClickCallback}
                    >
                        <p>Cancel</p>
                    </button>
                    <button
                        className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded hover:text-slate-100 hover:bg-slate-900"
                        onClick={onHandleSave}
                        onMouseEnter={e => {
                            e.preventDefault();
                            setHighlight("#f1f5f9");
                        }}
                        onMouseLeave={e => {
                            setHighlight("#475569");
                        }}
                        type="submit"
                    >
                        <p>Save</p>
                        <AiFillSave style={{
                            color: highlight
                        }} />
                    </button>
                </section>
            </form>
        </section>

    </section>;
}