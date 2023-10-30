import { SyntheticEvent, useState } from "react";
import { AiOutlinePlusCircle, AiFillSave, AiFillEdit } from "react-icons/ai";

import MembersTable from "../components/CustomTable";
import Dropdown from "../components/Dropdown";
import YearRange from "../components/YearRange";
import Display from "../components/Display";

export default function Department() {
    const [highlight, setHighlight] = useState("#475569");
    const [anotherHighlight, setAnotherHightlight] = useState("#475569");
    const [mode, setMode] = useState("default");

    const nodes = [
        {
            id: '0',
            organization: 'Association of Student Assistants',
            position: 'President',
            yearElected: '2021',
            nodes: [],
        },
        {
            id: '1',
            organization: 'Association of Student Assistants',
            position: 'Member',
            yearElected: '2019-2023',
            nodes: [],
        },
    ];

    const awardNodes = [
        {
            id: '0',
            awardsSeminar: 'Sample Seminar Held @ Davao City',
            awardName: 'Participant',
            year: '2023'
        }
    ];

    const handleEdit = (event: SyntheticEvent) => {
        event.preventDefault();

        if (mode === "edit") {
            setMode("default");
            return;
        }

        setMode("edit");
    };

    const handleSave = (event: SyntheticEvent) => {
        event.preventDefault();

        if (mode === "save") {
            setMode("default");
            return;
        }

        setMode("save");
    };

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
                    <p className="absolute text-center w-full top-16 text-slate-600 text-xs font-bold">(NOTE: SPELL OUT YOUR MIDDLE NAME)</p>
                </section>
                <section className="relative flex flex-col">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Suffix</label>
                    <input
                        type="text"
                        name="last-name" id="last-name"
                        className="block text-center rounded-md border-0 py-1.5 md:w-14 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        maxLength={3}
                        pattern="(((X){3}|V)?(I{3})((X){3}|V)?|JR|SR){1}"
                    />
                    <p className="absolute text-center w-full top-16 text-slate-600 text-xs font-bold">(E.G. SR, JR, III, IV, V)</p>
                </section>
                <section className="mt-8 py-5 px-2 flex flex-col w-full border border-zinc-400 rounded">
                    <Display>
                        {/* Clubs & Organizations */}
                        <Dropdown label="Clubs & Organization" items={["Association of Student Assistants"]} />
                        {/* Club Positions */}
                        <Dropdown label="Position" items={["President", "Member"]} />
                        {/* Year Elected */}
                        <YearRange label="Year Elected" />
                    </Display>
                    <MembersTable nodes={nodes} columns={["Club & Organization", "Position", "Year Elected"]} />
                    <hr className="my-5"/>
                    <Display>
                        {/* Awards & Seminars*/}
                        <Dropdown label="Awards & Seminars" items={["Sample Seminar Held @ Davao City"]} />
                        {/* Award Name */}
                        <Dropdown label="Award Name" items={["Participant"]} />
                        {/* Year */}
                        <YearRange label="Year" />
                    </Display>
                    <MembersTable nodes={awardNodes} columns={["Awards & Seminars", "Award Name", "Year"]} />
                    <section className="flex flex-row pt-5 gap-2 justify-end items-center">
                        {(mode === "edit") && <p className="text-slate-600 font-bold">(EDIT MODE)</p>}
                        {(mode === "save") && <p className="text-slate-600 font-bold">(SAVED SUCCESSFULLY)</p>}
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
                            onClick={handleSave}
                            onMouseEnter={e => {
                                e.preventDefault();
                                setAnotherHightlight("#f1f5f9");
                            }}
                            onMouseLeave={e => {
                                setAnotherHightlight("#475569");
                            }}
                        >
                            <p>Save</p>
                            <AiFillSave style={{
                                color: anotherHighlight
                            }} />
                        </button>
                    </section>
                </section>
            </section>
        </article>
    );
}