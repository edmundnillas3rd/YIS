import { SyntheticEvent, useEffect, useState } from "react";
import { AiFillSave, AiFillEdit } from "react-icons/ai";

import MembersTable from "../components/CustomTable";
import Dropdown from "../components/Dropdown";
import YearRange from "../components/YearRange";
import Display from "../components/Display";
import Container from "../components/Container";

export default function Department() {
    const [highlight, setHighlight] = useState("#475569");
    const [anotherHighlight, setAnotherHightlight] = useState("#475569");
    const [mode, setMode] = useState("default");

    const [studentID, setStudentID] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [familyName, setFamilyName] = useState<string | null>(null);
    const [middleName, setMiddleName] = useState<string | null>(null);
    const [suffix, setSuffix] = useState<string | null>(null);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const regexInvalidSymbols = "[^\"\'\.\,\$\#\@\!\~\`\^\&\%\*\(\)\-\+\=\\\|\/\:\;\>\<\?]+";

    useEffect(() => {
        setErrorMsg("");
        setMode("default");
    }, [studentID, firstName, familyName, middleName, suffix]);

    const nodes = [
        {
            id: '0',
            organization: 'Association of Student Assistants',
            position: 'President',
            yearElected: '2021',
        },
        {
            id: '1',
            organization: 'Association of Student Assistants',
            position: 'Member',
            yearElected: '2019-2023',
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

        setErrorMsg("");
        setMode("edit");
    };

    const save = () => {
        if (mode === "save") {
            setMode("default");
            return;
        }

        setMode("save");
    };

    const onChangeHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.currentTarget as HTMLInputElement;

        switch (target.name) {
            case "student-id":
                setStudentID(target.value as string);
                break;
            case "first-name":
                setFirstName(target.value as string);
                break;
            case "family-name":
                setFamilyName(target.value as string);
                break;
            case "middle-name":
                setMiddleName(target.value as string);
                break;
            case "suffix":
                setSuffix(target.value as string);
                break;
        }
    };

    const onInputHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.currentTarget as HTMLInputElement;
        target.setCustomValidity("");
    };

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (studentID && firstName && familyName && middleName) {
            save();
        } else {
            setMode("default");
            setErrorMsg("Fill up all the required fields");
            return;
        }
    };

    return (
        <article className="flex flex-col p-10 gap-10">
            {/* General Information Section */}
            <section>
                <h1 className="font-bold">GENERAL INFORMATION</h1>
            </section>
            <form method="post" onSubmit={onSubmitHandler}>
                <section>
                    <section>
                        <h1 className="md:pl-10 pt-5 font-bold">Student Name</h1>
                    </section>
                    <section className="md:px-10 flex flex-wrap flex-col md:flex-row gap-7 md:gap-10">
                        <section className="relative flex flex-col">
                            <label htmlFor="student-id" className="block text-sm font-medium leading-6 text-gray-900">Student ID</label>
                            <input
                                type="text"
                                name="student-id"
                                id="student-id"
                                className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={onChangeHandler}
                                onInput={onInputHandler}
                                pattern="(\d{4}-\d{4}-\d)"
                                required
                                autoComplete="off"
                            />
                            <p className="absolute text-center w-full top-16 text-slate-600 text-xs font-bold">(FORMAT EXAMPLE: 2018-4024-2)</p>
                        </section>
                        <section className="flex flex-col">
                            <label htmlFor="family-name" className="block text-sm font-medium leading-6 text-gray-900">Family Name</label>
                            <input
                                type="text"
                                name="family-name"
                                id="family-name"
                                className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={onChangeHandler}
                                onInput={onInputHandler}
                                pattern={regexInvalidSymbols}
                                maxLength={50}
                                required
                                autoComplete="off"
                            />
                        </section>
                        <section className="flex flex-col">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={onChangeHandler}
                                onInput={onInputHandler}
                                pattern={regexInvalidSymbols}
                                maxLength={50}
                                required
                                autoComplete="off"
                            />
                        </section>
                        <section className="relative flex flex-col">
                            <label htmlFor="middle-name" className="block text-sm font-medium leading-6 text-gray-900">Middle Name</label>
                            <input
                                type="text"
                                name="middle-name"
                                id="middle-name"
                                className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={onChangeHandler}
                                onInput={onInputHandler}
                                pattern={`[A-Za-z]${regexInvalidSymbols}`}
                                maxLength={50}
                                required
                                autoComplete="off"
                            />
                            <p className="absolute text-center w-full top-16 text-slate-600 text-xs font-bold">(NOTE: SPELL OUT YOUR MIDDLE NAME)</p>
                        </section>
                        <section className="relative flex flex-col">
                            <label htmlFor="suffix" className="block text-sm font-medium leading-6 text-gray-900">Suffix</label>
                            <input
                                type="text"
                                name="suffix"
                                id="suffix"
                                className="block text-center rounded-md border-0 py-1.5 md:w-14 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                maxLength={4}
                                pattern={`(IX|X|IV|V?(I{0,3})|SR|JR|)?`}
                                onChange={onChangeHandler}
                                onInput={onInputHandler}
                                autoComplete="off"
                            />
                            <p className="absolute text-center w-full top-16 text-slate-600 text-xs font-bold">(E.G. SR, JR, III, IV, V)</p>
                        </section>
                    </section>
                </section>
                {/* Clubs, Seminars, and Achievements */}
                <section className="md:px-10 mt-10 flex flex-col gap-2">
                    <section>
                        <h1 className="pt-5 font-bold">Clubs, Seminars, and Achievements</h1>
                    </section>
                    <Container>
                        <Display>
                            {/* Clubs & Organizations */}
                            <Dropdown label="Clubs & Organization" items={["Association of Student Assistants"]} />
                            {/* Club Positions */}
                            <Dropdown label="Position" items={["President", "Member"]} />
                            {/* Year Elected */}
                            <YearRange label="Year Elected" />
                        </Display>
                        <p className="text-slate-600 text-xs mt-7 font-bold">NOTE: ONLY FIVE (5)</p>
                        <MembersTable nodes={nodes} columns={["Club & Organization", "Position", "Year Elected"]} mode={mode} />
                        <hr className="my-5" />
                        <Display>
                            {/* Awards & Seminars*/}
                            <Dropdown label="Awards & Seminars" items={["Sample Seminar Held @ Davao City"]} />
                            {/* Award Name */}
                            <Dropdown label="Award Name" items={["Participant"]} />
                            {/* Year */}
                            <YearRange label="Year" />
                        </Display>
                        <p className="text-slate-600 text-xs mt-7 font-bold">NOTE: ONLY FIVE (5)</p>
                        <MembersTable nodes={awardNodes} columns={["Awards & Seminars", "Award Name", "Year"]} mode={mode} />
                    </Container>
                    <section className="flex flex-row pt-5 gap-2 justify-end items-center">
                        {(mode === "edit") && <p className="text-slate-600 font-bold">(EDIT MODE)</p>}
                        {(mode === "save") && <p className="text-slate-600 font-bold">(SAVED SUCCESSFULLY)</p>}
                        {errorMsg && <p className="text-red-600 font-bold">{errorMsg}</p>}
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
            </form>
        </article >
    );
}