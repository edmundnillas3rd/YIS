import { SyntheticEvent, useState } from "react";
import { AiFillEdit, AiFillSave } from "react-icons/ai";

interface PopupModalProps {
    data: any;
    onClickCallback: (event: SyntheticEvent) => void;
}

export default function PopupModal({ data, onClickCallback }: PopupModalProps) {
    const [highlight, setHighlight] = useState("#475569");
    const [anotherHighlight, setAnotherHightlight] = useState("#475569");

    const {
        id,
        course,
        name,
        soliNum,
        careOf,
        returned,
        dateReturn,
        yearbookHalfPaid,
        yearbookHalfPaidOr,
        fullyPaid,
        fullyPaidOr
    } = data;

    const handleEdit = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
            <section className="bg-white border border-zinc-400 rounded flex flex-col w-1/2 p-10 gap-2">
                <section className="flex flex-row justify-between">
                    <section className="flex flex-col mb-5">
                        <h3 className="font-bold">{name}</h3>
                        <h3 className="font-bold">Solic Form # {soliNum}</h3>
                    </section>
                    <section className="font-bold h-10 w-10 flex flex-row justify-center items-center cursor-pointer" onClick={onClickCallback}>X</section>
                </section>
                <section className="flex flex-col">
                    <label htmlFor="soli-form-status" className="block text-sm font-medium leading-6 text-gray-900">Solicitation Form Returned</label>
                    <input
                        type="text"
                        name="soli-form-status"
                        id="soli-form-status"
                        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="off"
                        value={returned}
                        disabled
                    />
                </section>
                <section className="flex flex-col">
                    <label htmlFor="date-return" className="block text-sm font-medium leading-6 text-gray-900">Date Returned</label>
                    <input
                        type="text"
                        name="date-return"
                        id="date-return"
                        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="off"
                        value={dateReturn}
                        disabled
                    />
                </section>
                <section className="flex flex-col">
                    <label htmlFor="yearbook-receiptor" className="block text-sm font-medium leading-6 text-gray-900">Yearbook Receiptor #</label>
                    <input
                        type="text"
                        name="yearbook-receiptor"
                        id="yearbook-receiptor"
                        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="off"
                        value={"####"}
                        disabled
                    />
                </section>
                <section className="flex flex-col">
                    <label htmlFor="halfpaid-yearbook-receiptor-num" className="block text-sm font-medium leading-6 text-gray-900">Half Paid Yearbook Receiptor #</label>
                    <input
                        type="text"
                        name="halfpaid-yearbook-receiptor-num"
                        id="halfpaid-yearbook-receiptor-num"
                        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="off"
                        value={"####"}
                        disabled
                    />
                </section>
                <section className="flex flex-col">
                    <label htmlFor="fully-paid-receiptor-num" className="block text-sm font-medium leading-6 text-gray-900">Fully Paid Yearbook Receiptor #</label>
                    <input
                        type="text"
                        name="fully-paid-receiptor-num"
                        id="fully-paid-receiptor-num"
                        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="off"
                        value={"####"}
                        disabled
                    />
                </section>
                <section className="flex flex-col">
                    <label htmlFor="lost-soli-num" className="block text-sm font-medium leading-6 text-gray-900">Lost Solicitation Form #</label>
                    <input
                        type="text"
                        name="lost-soli-num"
                        id="lost-soli-num"
                        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="off"
                        value={"####"}
                        disabled
                    />
                </section>
                <section className="flex flex-row pt-5 gap-2 justify-end items-center">
                    <button
                        className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded hover:text-slate-100 hover:bg-slate-900"
                        onClick={handleEdit}
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