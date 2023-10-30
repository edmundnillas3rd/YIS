import { useParams } from "react-router-dom";

export default function Department() {
    const { college_division } = useParams();

    return (
        <article className="flex flex-col">
            <section className="p-10">
                <h1 className="font-bold">GENERAL INFORMATION</h1>
            </section>
            {/* General Information Section */}
            <section className="px-10 flex flex-col md:flex-row gap-7 md:gap-10">
                <section className="flex flex-col">
                    <label htmlFor="family-name" className="block text-sm font-medium leading-6 text-gray-900">Family Name</label>
                    <input type="text" name="family-name" id="family-name" className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </section>
                <section className="flex flex-col">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    <input type="text" name="first-name" id="first-name" className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </section>
                <section className="relative flex flex-col">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Middle Name</label>
                    <input type="text" name="last-name" id="last-name" className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <p className="absolute text-center w-full top-16 text-slate-400 text-xs font-bold">(NOTE: SPELL OUT YOUR MIDDLE NAME)</p>
                </section>
                <section className="relative flex flex-col">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Suffix</label>
                    <input
                        type="text"
                        name="last-name" id="last-name"
                        className="block rounded-md border-0 py-1.5 md:w-14 text-gray-900 ring-1 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        maxLength={3}
                        pattern="(V?(I{3})V?|JR|SR)"
                    />
                    <p className="absolute text-center w-full top-16 text-slate-400 text-xs font-bold">(E.G. SR, JR, III, IV, V)</p>
                </section>
            </section>
            {/* Clubs & Organization Section*/}
            {/* <section>
                <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Assigned to</label>
            </section> */}
        </article>
    );
}