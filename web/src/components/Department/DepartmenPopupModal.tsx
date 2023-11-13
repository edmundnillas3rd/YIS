import { SyntheticEvent, useEffect, useState } from "react";
import { AiFillEdit, AiFillSave } from "react-icons/ai";

interface InfoItemProps {
    field: any;
    value: any;
    label: any;
    disabled: boolean;
}

const InfoItem = ({field, value, label, disabled = false}: InfoItemProps, ) => (
    <section className="flex flex-col">
        <label htmlFor={field} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <input
            type="text"
            name={field}
            id={field}
            className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            autoComplete="off"
            value={value}
            disabled={disabled}
        />
    </section>
);

export default function PopupModal({ data, onClickCallback }: PopupModalProps) {
    const [highlight, setHighlight] = useState("#475569");
    const [anotherHighlight, setAnotherHightlight] = useState("#475569");
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onHandleSave = (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(true);
    };

    const onHandleEdit = (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(false);
    };

    return (
        <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
            <section className="bg-white border border-zinc-400 rounded flex flex-col md:w-1/2 p-10 gap-2">
                <section className="flex flex-row items-center justify-between gap-5">
                    <section className="flex flex-col justify-center">
                        <h3 className="font-bold">Club Organization Information</h3>
                    </section>
                    <section className="font-bold p-2 flex flex-row cursor-pointer hover:bg-zinc-300 hover:rounded" onClick={onClickCallback}>X</section>
                </section>
                {Object.entries(data).map(([key, val], i) => {
                    if (key === "id") return;
                    return <InfoItem key={i} field={key} value={val} label={key.toUpperCase()} disabled={disabled} />
                })}
                <section className="flex flex-row pt-5 gap-2 justify-end items-center">
                    <button
                        className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded hover:text-slate-100 hover:bg-slate-900"
                        onClick={onHandleEdit}
                        onMouseEnter={e => {
                            e.preventDefault();
                            setHighlight("#f1f5f9");
                        }}
                        onMouseLeave={e => {
                            e.preventDefault();
                            setHighlight("#475569");
                        }}
                    >
                        <p>Edit</p>
                        <AiFillEdit style={{
                            color: highlight
                        }} />
                    </button>
                    <button
                        className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded hover:text-slate-100 hover:bg-slate-900"
                        onClick={onHandleSave}
                        onMouseEnter={e => {
                            e.preventDefault();
                            setAnotherHightlight("#f1f5f9");
                        }}
                        onMouseLeave={e => {
                            setAnotherHightlight("#475569");
                        }}
                        type="submit"
                    >
                        <p>Save</p>
                        <AiFillSave style={{
                            color: anotherHighlight
                        }} />
                    </button>
                </section>
            </section>

        </section>
    );
}