import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Dropdown from "../components/Dropdown";

export default function SoliciationFormPage() {
    // Student
    const [studentID, setStudentID] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [familyName, setFamilyName] = useState<string | null>(null);
    const [middleName, setMiddleName] = useState<string | null>(null);
    const [suffix, setSuffix] = useState<string | null>(null);

    // Care of
    const [receiverFirstName, setReceiverFirstName] = useState<string | null>(null);
    const [receiverFamilyName, setReceiverFamilyName] = useState<string | null>(null);
    const [receiverMiddleName, setReceiverMiddleName] = useState<string | null>(null);
    const [receiverSuffix, setReceiverSuffix] = useState<string | null>(null);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const regexInvalidSymbols = "[^\"\'\.\,\$\#\@\!\~\`\^\&\%\*\(\)\-\+\=\\\|\/\:\;\>\<\?]+";

    const navigate = useNavigate();

    useEffect(() => {
        const role = import.meta.env.VITE_USER_ROLE;

        if (role !== "admin") {
            navigate("/home");
        }
    }, []);

    const save = () => {
    };

    const onInputHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.currentTarget as HTMLInputElement;
        target.setCustomValidity("");
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

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (studentID && firstName && familyName && middleName) {
            save();
        } else {
            setErrorMsg("Fill up all the required fields");
            return;
        }
    };

    return <article className="flex flex-col p-10 gap-0">
        <h3 className="font-bold mb-3">Solicitation Forms</h3>
        <Container>
            <h3 className="font-bold">Student:</h3>
            <section className="w-full">
                <Dropdown label="Course" items={["BSCS", "BSBA"]} />
            </section>
            {/* Student Section */}
            <section className="flex flex-col md:flex-row flex-wrap gap-5 md:gap-2 mb-16">
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
            <section className="flex flex-col md:flex-row gap-5 md:gap-0">
                <section className="relative flex flex-col">
                    <label htmlFor="solicitation-form-number" className="block text-sm font-medium leading-6 text-gray-900">Solicitation Form Number</label>
                    <input
                        type="text"
                        name="solicitation-form-number"
                        id="solicitation-form-number"
                        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={onChangeHandler}
                        onInput={onInputHandler}
                        pattern={regexInvalidSymbols}
                        maxLength={50}
                        required
                        autoComplete="off"
                    />
                    <p className="absolute text-center w-full top-16 text-slate-600 text-xs font-bold">(EX. 2023-2010)</p>
                </section>
            </section>
            {/* Care of Section */}
            <section className="mt-10">
                <h3 className="font-bold">Care of:</h3>
                <p className="text-left w-full top-16 text-slate-600 text-xs font-bold">(NOTE: IN CASE OF LOSS, THE PERSON RESPONSIBLE WILL PAY 200 PESOS)</p>
            </section>
            <section className="flex flex-col md:flex-row flex-wrap gap-2 mb-20">
                <section className="flex flex-col gap-2">
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
                <section className="flex flex-col gap-2">
                    <label htmlFor="family-name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
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
                <section className="flex flex-col gap-2">
                    <label htmlFor="relation" className="block text-sm font-medium leading-6 text-gray-900">Middle Name</label>
                    <input
                        type="text"
                        name="middle-name"
                        id="middle-name"
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
                <section className="flex flex-col gap-2">
                    <label htmlFor="relation" className="block text-sm font-medium leading-6 text-gray-900">Relation</label>
                    <input
                        type="text"
                        name="relation"
                        id="relation"
                        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={onChangeHandler}
                        onInput={onInputHandler}
                        pattern={regexInvalidSymbols}
                        maxLength={50}
                        required
                        autoComplete="off"
                    />
                </section>
            </section>

        </Container>
    </article>;
}