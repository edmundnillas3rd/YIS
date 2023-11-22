import { SyntheticEvent, useState } from "react";
import Dropdown from "../Dropdown";
import { generateYearRange } from "../../utilities/generateYearRange";
import { AiFillEdit, AiFillSave } from "react-icons/ai";

interface AwardPopupModalProps {
    data: any;
    onClickCallback?: (data: any) => void;
}

interface Award {
    awardID: string;
    awardAttendedName: string;
    awardName: string;
    awardReceived: string;
}

export default function AwardPopupModal({ data, onClickCallback }: AwardPopupModalProps) {
    const regexInvalidSymbols = "[^\"\'\.\,\$\#\@\!\~\`\^\&\%\*\(\)\-\+\=\\\|\/\:\;\>\<\?]+";

    const [disabled, setDisabled] = useState<boolean>(true);

    const [award, setAward] = useState<Award>(data);

    const onHandleSave = async (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(true);

        setDisabled(false);
    };

    const onHandleEdit = (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(false);
    };

    return (
        <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">

            <section className="bg-white border border-zinc-400 rounded flex flex-col md:w-1/2 p-10 gap-2">
                <section className="flex justify-end">
                    <button
                        className="text-black hover:cursor-pointer font-bold"
                        onClick={onClickCallback}
                    >X
                    </button>
                </section>
                <section className="flex flex-col gap-2">
                    <section className="flex flex-col">
                        <label htmlFor="award-seminar">Award/Seminar</label>
                        <input className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            id="award-seminar"
                            name="award-seminar"
                            min={5}
                            value={award.awardAttendedName}
                            pattern={regexInvalidSymbols}
                            onChange={(event: SyntheticEvent) => {
                            }}
                            disabled={disabled}
                        />
                    </section>
                    <section className="flex flex-col">
                        <label htmlFor="awards">Awards/ETC</label>
                        <input className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            id="awards"
                            name="awards"
                            min={5}
                            value={award.awardName}
                            pattern={regexInvalidSymbols}
                            onChange={(event: SyntheticEvent) => {
                                event.preventDefault();
                                const target = event.target as HTMLInputElement;
                            }}
                            disabled={disabled}

                        />
                    </section>
                    <Dropdown label="Date Received" defaultValue={award.awardReceived} items={generateYearRange(2000)} disabled={disabled} />
                    <section className="flex flex-row gap-2 mt-2 justify-end">

                        {disabled ? (
                            <button
                                className="flex flex-row justify-center items-center gap-3 font-bold text-slate-100 bg-red-600 p-1 rounded"
                                onClick={onHandleEdit}
                            >
                                <p>Edit</p>
                                <AiFillEdit/>
                            </button>
                        ) : (
                            <>
                                <button
                                    className="flex flex-row justify-center items-center gap-3 font-bold text-slate-100 bg-red-600 p-1 rounded"
                                    onClick={(e: SyntheticEvent) => {
                                        e.preventDefault();
                                        setDisabled(true);
                                    }}
                                    type="submit"
                                >
                                    <p>Cancel</p>
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
            </section>
        </section>
    );

}