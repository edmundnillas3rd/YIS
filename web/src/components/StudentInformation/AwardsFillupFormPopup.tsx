import { SyntheticEvent, useEffect, useState } from "react";
import { AiFillSave } from "react-icons/ai";

export default function AwardsFillupFormPopup({ name, data, onClickCallback }: PopupModalProps) {
    const regexInvalidSymbols = "[^\"\'\.\,\$\#\@\!\~\`\^\&\%\*\(\)\-\+\=\\\|\/\:\;\>\<\?]+";
    let currentDate = new Date().toJSON().slice(0, 10);
    const [errMessage, setErrMessage] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);
    const [awardAttendedName, setAwardAttendedName] = useState<string>();
    const [awardName, setAwardName] = useState<string>();
    const [awardReceived, setAwardRecieved] = useState<string>();

    const onHandleSave = async (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(true);

        const data = {
            awardAttendedName,
            awardName,
            awardReceived
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/award-add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log("Successfully add new award");
        } else {
            console.log("Failed to add award");
        }

        setDisabled(false);
        onClickCallback(event);
    };

    return <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
        <section className="bg-white border border-zinc-400 rounded flex flex-col md:w-1/2 p-10 gap-2">
            <section className="flex flex-row items-center justify-between gap-5">
                <section className="flex flex-col justify-center">
                    <h3 className="font-bold">{name}</h3>
                </section>
            </section>

            <form className="flex flex-col gap-2">
                <section className="flex flex-col">
                    <label htmlFor="award-seminar">Award/Seminar</label>
                    <input className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        id="award-seminar"
                        name="award-seminar"
                        min={5}
                        pattern={regexInvalidSymbols}
                        onChange={(event: SyntheticEvent) => {
                            event.preventDefault();
                            const target = event.target as HTMLInputElement;
                            setAwardAttendedName(target.value);
                        }}
                    />
                </section>
                <section className="flex flex-col">
                    <label htmlFor="awards">Awards/ETC</label>
                    <input className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        id="awards"
                        name="awards"
                        min={5}
                        pattern={regexInvalidSymbols}
                        onChange={(event: SyntheticEvent) => {
                            event.preventDefault();
                            const target = event.target as HTMLInputElement;
                            setAwardName(target.value);
                        }}
                    />
                </section>
                <section className="flex flex-col">
                    <label htmlFor="award-received">Awards Received</label>
                    <input className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="date"
                        id="award-received"
                        name="award-received"
                        min={"2000-01-01"}
                        max={currentDate}
                        onChange={(event: SyntheticEvent) => {
                            event.preventDefault();
                            const target = event.target as HTMLInputElement;
                            setAwardRecieved(target.value);
                        }}
                    />
                </section>
                {/* <Dropdown items={participantTypeNodes} label="Award"/> */}
                <section className="flex flex-row pt-5 gap-2 justify-end items-center">
                    {errMessage && <p className="ml-5 text-red-400 text-sm font-bold">{errMessage}</p>}
                    <button
                        className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded"
                        onClick={onClickCallback}
                        disabled={disabled}
                    >
                        <p>Cancel</p>
                    </button>
                    <button
                        className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded"
                        onClick={onHandleSave}
                        disabled={disabled}
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