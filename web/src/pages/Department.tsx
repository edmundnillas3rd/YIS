import { useParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";

export default function Department() {
    const { college_division } = useParams();
    const [showClubs, setShowClubs] = useState(false);
    const [showPositions, setShowPositions] = useState(false);

    // For "Year Elected" section
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

    return (
        <article className="flex flex-col p-10">
            <section>
                <h1 className="font-bold">GENERAL INFORMATION</h1>
            </section>
            {/* General Information Section */}
            <section className="md:px-10 py-5 flex flex-wrap flex-col md:flex-row gap-7 md:gap-10">
                <section className="flex flex-col">
                    <label htmlFor="family-name" className="block text-sm font-medium leading-6 text-gray-900">Family Name</label>
                    <input type="text" name="family-name" id="family-name" className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </section>
                <section className="flex flex-col">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    <input type="text" name="first-name" id="first-name" className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </section>
                <section className="relative flex flex-col">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Middle Name</label>
                    <input type="text" name="last-name" id="last-name" className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <p className="absolute text-center w-full top-16 text-slate-400 text-xs font-bold">(NOTE: SPELL OUT YOUR MIDDLE NAME)</p>
                </section>
                <section className="relative flex flex-col">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Suffix</label>
                    <input
                        type="text"
                        name="last-name" id="last-name"
                        className="block text-center rounded-md border-0 py-1.5 md:w-14 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        maxLength={3}
                        pattern="(V?(I{3})V?|JR|SR)"
                    />
                    <p className="absolute text-center w-full top-16 text-slate-400 text-xs font-bold">(E.G. SR, JR, III, IV, V)</p>
                </section>
            </section>
            <section className="md:w-full mt-16 md:px-10 border border-zinc-400 rounded py-5 flex flex-col md:flex-row md:gap-10">
                {/* Clubs & Organizations */}
                <section className="flex flex-col p-5 md:p-0 md:w-5/12">
                    <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Clubs & Organizations</label>

                    <section className="relative">
                        <button
                            type="button"
                            className="relative w-full h-8 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            aria-haspopup="listbox"
                            aria-expanded="true"
                            aria-labelledby="listbox-label"
                            onClick={e => {
                                e.preventDefault();
                                setShowClubs(!showClubs);
                            }}
                        >
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <FaAngleDown style={{
                                    color: "black"
                                }} />
                            </span>
                        </button>
                        {showClubs && <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex={1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                            <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">Association of Student Assistants</li>
                        </ul>}
                    </section>
                </section>
                {/* Club Positions */}
                <section className="flex flex-col p-5 md:p-0 md:w-5/12">
                    <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Positions</label>

                    <section className="relative">
                        <button
                            type="button"
                            className="relative w-full h-8 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            aria-haspopup="listbox"
                            aria-expanded="true"
                            aria-labelledby="listbox-label"
                            onClick={e => {
                                e.preventDefault();
                                setShowPositions(!showPositions);
                            }}
                        >
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <FaAngleDown style={{
                                    color: "black"
                                }} />
                            </span>
                        </button>
                        {showPositions && <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex={1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                            <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">President</li>
                            <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">Member</li>
                        </ul>}
                    </section>
                </section>
                {/* Year Elected */}
                <section className="flex flex-col p-5 md:p-0 md:w-5/12">
                    <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Year Elected</label>

                    <section className="flex flex-row gap-4">
                        {/* From */}
                        <section className="relative w-full">
                            <button
                                type="button"
                                className="relative w-full h-8 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                aria-haspopup="listbox"
                                aria-expanded="true"
                                aria-labelledby="listbox-label"
                                onClick={e => {
                                    e.preventDefault();
                                    setShowFrom(!showFrom);
                                }}
                            >
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <FaAngleDown style={{
                                        color: "black"
                                    }} />
                                </span>
                            </button>
                            {showFrom &&
                                <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex={1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                                    <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2019</li>
                                    <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2020</li>
                                    <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2021</li>
                                    <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2023</li>
                                </ul>
                            }
                        </section>
                        
                        <p className="font-bold text-sm text-slate-400 flex items-center">TO</p>

                        {/* To */}
                        <section className="relative w-full">
                            <button
                                type="button"
                                className="relative w-full h-8 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                aria-haspopup="listbox"
                                aria-expanded="true"
                                aria-labelledby="listbox-label"
                                onClick={e => {
                                    e.preventDefault();
                                    setShowTo(!showTo);
                                }}
                            >
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <FaAngleDown style={{
                                        color: "black"
                                    }} />
                                </span>
                            </button>
                            {showTo &&
                                <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex={1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                                    <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2019</li>
                                    <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2020</li>
                                    <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2021</li>
                                    <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2023</li>
                                </ul>
                            }
                        </section>
                    </section>
                </section>
            </section>
        </article>
    );
}