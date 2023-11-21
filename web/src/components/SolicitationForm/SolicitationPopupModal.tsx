import { SyntheticEvent, useEffect, useState } from "react";
import { AiFillEdit, AiFillSave } from "react-icons/ai";

interface PopupModalProps {
    data: any;
    onClickCallback: (event: SyntheticEvent) => void;
}

interface SolicitationForm {
    id: string;
    course: string;
    fullName: string;
    soliNumber: string;
    careOfFullName: string;
    returnedStatus: string;
    dateReturned: string;
    ORnumber: string;
    onClickCallback?: (data: any) => void;
}

const SolicitationFillupForm = ({
    id,
    course,
    fullName,
    soliNumber,
    careOfFullName,
    returnedStatus,
    dateReturned,
    ORnumber,

}: SolicitationForm) => {

    const [edit, setEdit] = useState<boolean>(false);


    const handleSave = (event: SyntheticEvent) => {
        event.preventDefault();
        setEdit(false);
    };

    const handleEdit = (event: SyntheticEvent) => {
        event.preventDefault();
        setEdit(true);
    };

    return <>
        <section className="flex flex-row items-center justify-between">

            <h3 className="font-bold">Solicitation Form #{soliNumber}</h3>
        </section>
        <section className="flex flex-col">
            <label htmlFor="soli-form-status" className="block text-sm font-medium leading-6 text-gray-900">Solicitation Form Returned</label>
            <input
                type="text"
                name="soli-form-status"
                id="soli-form-status"
                className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                autoComplete="off"
                value={returnedStatus}
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
                value={dateReturned}
                disabled
            />
        </section>
        <section className="flex flex-col">
            <label htmlFor="careof" className="block text-sm font-medium leading-6 text-gray-900">Care Of</label>
            <input
                type="text"
                name="careof"
                id="careof"
                className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                autoComplete="off"
                value={careOfFullName}
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
                value={ORnumber}
                disabled
            />
        </section>
        <section className="flex flex-row pt-5 gap-2 justify-end items-center">
            {!edit && (
                <button
                    className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded"
                    onClick={handleEdit}
                >
                    <p>Edit</p>
                    <AiFillEdit style={{
                        color: "#475569"
                    }} />
                </button>
            )
            }
            {edit && (
                <>
                <button
                    className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded"
                    onClick={e => {
                        setEdit(false);
                    }}
                    type="submit"
                >
                    <p>Cancel</p>
                    <AiFillSave style={{
                        color: "#475569"
                    }} />
                </button>
                <button
                    className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-zinc-600 p-1 rounded"
                    onClick={handleSave}
                    type="submit"
                >
                    <p>Save</p>
                    <AiFillSave style={{
                        color: "#475569"
                    }} />
                </button>
                </>
            )
            }
        </section>
    </>;
};

export default function PopupModal({ data, onClickCallback }: PopupModalProps) {

    const [solicitations, setSolicitations] = useState<SolicitationForm[]>();

    const {
        id,
        // course,
        fullName,
        // soliNumber,
        // careOfFullName,
        // returnedStatus,
        // dateReturned,
        // ORnumber
    }: SolicitationForm = data;

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation/${id}`);
            const data = await response.json();
            setSolicitations(data.solicitations);
        })();
    }, []);

    const handleEdit = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
            <section className="bg-white border border-zinc-400 rounded flex flex-col md:w-1/2 p-10 gap-2">
                <section className="flex flex-row justify-between items-center">
                    <h3 className="font-bold">{fullName}</h3>
                    <section className="font-bold p-2 flex flex-row cursor-pointer hover:bg-zinc-300 hover:rounded" onClick={onClickCallback}>X</section>
                </section>
                <section className="overflow-y-scroll h-96">
                    {solicitations && solicitations.map((soli, i) => {
                        return (
                            <>
                                <hr className="my-5" />
                                <SolicitationFillupForm key={i} {...soli} />
                            </>
                        );
                    })}

                </section>
            </section>
        </section>
    );
}