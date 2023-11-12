import { SyntheticEvent, useState } from "react";
import { AiFillSave } from "react-icons/ai";

export default function FillFormPopup({ name,  data, onClickCallback }: PopupModalProps) {
    const [highlight, setHighlight] = useState("#475569");
    const [disabled, setDisabled] = useState<boolean>(true);

    const onHandleSave = (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(true);
    };

    const onHandleEdit = (event: SyntheticEvent) => {
        setDisabled(false);
    };

    return <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
        <section className="bg-white border border-zinc-400 rounded flex flex-col md:w-1/2 p-10 gap-2">
            <section className="flex flex-row items-center justify-between gap-5">
                <section className="flex flex-col justify-center">
                    <h3 className="font-bold">{name}</h3>
                </section>
                {/* <section className="font-bold p-2 flex flex-row cursor-pointer hover:bg-zinc-300 hover:rounded" onClick={onClickCallback}>X</section> */}
            </section>
            {/* <section className="flex flex-col">
                    <label htmlFor="soli-form-status" className="block text-sm font-medium leading-6 text-gray-900">Solicitation Form Returned</label>
                    <input
                        type="text"
                        name="soli-form-status"
                        id="soli-form-status"
                        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="off"
                        value="RETURNED"
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
                        value={""}
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
                <section className="flex flex-col">
                    <label htmlFor="lost-soli-or" className="block text-sm font-medium leading-6 text-gray-900">Lost Solicitation OR #</label>
                    <input
                        type="text"
                        name="lost-soli-or"
                        id="lost-soli-or"
                        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        autoComplete="off"
                        value={"####"}
                        disabled
                    />
                </section> */}
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
        </section>

    </section>;
}