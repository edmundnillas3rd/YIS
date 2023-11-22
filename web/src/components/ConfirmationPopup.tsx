import { SyntheticEvent } from "react";

export default function ConfirmationPopup({ id, onClickCallback }: any) {

    const onHandleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/${id}/user-organization-remove`, {
            method: "DELETE",
            credentials: "include",
        })

        if (response.ok) {
            console.log("Successfully removed entry");
            if (onClickCallback)
                onClickCallback();
        }
    }

    const onHandleExit = (event: SyntheticEvent) => {
        event.preventDefault();

        if (onClickCallback)
            onClickCallback(event);
    }
    return (
        <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
            <section className="bg-white border border-zinc-400 rounded flex flex-col md:w-1/2 p-10 gap-2">
                <p className="font-bold">Confirm Deletion</p>
                <button onClick={onHandleSubmit} className="font-bold text-slate-100 bg-red-600 p-2 rounded">Yes</button>
                <button onClick={onHandleExit} className="font-bold text-slate-100 bg-red-600 p-2 rounded">No</button>
            </section>
        </section>
    );
}