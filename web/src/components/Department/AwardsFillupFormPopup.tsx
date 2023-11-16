import { SyntheticEvent, useEffect, useState } from "react";
import { AiFillSave } from "react-icons/ai";

import Dropdown from "../Dropdown";

export default function AwardsFillupFormPopup({ name, data, onClickCallback }: PopupModalProps) {
    const [errMessage, setErrMessage] = useState<string>("");
    const [highlight, setHighlight] = useState("#475569");
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {

    }, []);

    const participantTypeNodes = [
        {
            id: "1",
            name: "Participant"
        },
        {
            id: "2",
            name: "Speaker"
        },
        {
            id: "3",
            name: "Facilitator"
        }
    ]

    const onHandleSave = async (event: SyntheticEvent) => {


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
                <section className="flex flex-col">
                    <label htmlFor="award-seminar">Award/Seminar</label>
                    <input className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" id="award-seminar" name="award-seminar"/>   
                </section>
                <Dropdown items={participantTypeNodes} label="Award"/>
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