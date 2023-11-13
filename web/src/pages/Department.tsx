import { SyntheticEvent, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";

import MembersTable from "../components/CustomTable";
import Dropdown from "../components/Dropdown";
import YearRange from "../components/YearRange";
import Display from "../components/Display";
import Container from "../components/Container";
import PopupModal from "../components/Department/DepartmenPopupModal";
import Spinner from "../components/Spinner";
import FillFormPopup from "../components/Department/FillupFormPopup";

export default function Department() {
    const [mode, setMode] = useState("default");
    const [loading, setLoading] = useState(false);
    const [addClubs, setAddClubs] = useState(false);
    const [addAwards, setAddAwards] = useState(false);
    
    const [user, setUser] = useState<User>();
    const [studentID, setStudentID] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [familyName, setFamilyName] = useState<string | null>(null);
    const [middleName, setMiddleName] = useState<string | null>(null);
    const [suffix, setSuffix] = useState<string | null>(null);

    const [clubAttr, setClubsAttr] = useState<ClubAttr>({ positions: [], organizations: [] });
    const [clubData, setClubsData] = useState<any>();

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const regexInvalidSymbols = "[^\"\'\.\,\$\#\@\!\~\`\^\&\%\*\(\)\-\+\=\\\|\/\:\;\>\<\?]+";

    useEffect(() => {
        setLoading(true);

        fetch(`${import.meta.env.VITE_BASE_URL}/users/user-current`, {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                setUser(data.user);
            });

        fetch(`${import.meta.env.VITE_BASE_URL}/clubs`, {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {

                const positions = data.positions.map(({ club_position_id, club_position_name }: Position) => ({ id: club_position_id, name: club_position_name }));
                const organizations = data.organizations.map(({ club_organization_id, club_organization_name }: Organization) => ({ id: club_organization_id, name: club_organization_name }));

                setClubsAttr({
                    positions,
                    organizations
                });
            });

        fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-club`, {
            credentials: "include"
        })
            .then(response => response.json())
            .then((data: any) => {
                const clubs = data.rows.map(({ organization, ...attr }: any, idx: number) => ({ id: idx.toString(), organization }));
                const clubData = data.rows;
                setClubsData({
                    clubs,
                    clubData
                });
            });
        setLoading(false);
    }, []);

    useEffect(() => {
        setErrorMsg("");
        setMode("default");
    }, [studentID, firstName, familyName, middleName, suffix]);

    useEffect(() => {
        if (!addClubs) {
            fetch(`${import.meta.env.VITE_BASE_URL}/clubs`)
            .then(response => response.json())
            .then(data => {

                const positions = data.positions.map(({ club_position_id, club_position_name }: Position) => ({ id: club_position_id, name: club_position_name }));
                const organizations = data.organizations.map(({ club_organization_id, club_organization_name }: Organization) => ({ id: club_organization_id, name: club_organization_name }));

                setClubsAttr({
                    positions,
                    organizations
                });
            });
        }
    }, [addClubs, addAwards]);

    const awards = [
        {
            id: '0',
            awardAttendedName: 'Sample Seminar Held @ Davao City',
            awardName: 'Participant',
            awardReceived: '2023'
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

    const save = async () => {
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
            await save();

            const modifiedClubs = clubData.map(({ id, ...attrs }: any) => attrs);
            const modifiedAwards = awards.map(({ id, ...attrs }) => attrs);

            const data = {
                modifiedClubs,
                modifiedAwards
            };

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation/return-solicitation`, {
                body: JSON.stringify(data),
                credentials: "include"
            });

            if (response.ok) {
                setMode("default");
            }

        } else {
            setMode("default");
            setErrorMsg("Fill up all the required fields");
            return;
        }
    };

    const [currentNode, setCurrentNode] = useState<any | null>(null);

    const onClickCallback = (i: any) => {
        setCurrentNode(clubData.clubData[0]);
    };

    const onClickCallbackPopup = (event: SyntheticEvent) => {
        setCurrentNode(null);
    };

    const onClickCallbackAddClub = async (event: SyntheticEvent) => {
        setAddClubs(false);
    }

    const onClickCallbackAward = async (event: SyntheticEvent) => {
        setAddAwards(false);
    }

    return (
        <>
            {currentNode && <PopupModal data={currentNode} onClickCallback={onClickCallbackPopup} />}
            {addClubs && <FillFormPopup name="Club Organization Information" data={undefined} onClickCallback={onClickCallbackAddClub} />}
            {addAwards && <FillFormPopup name="Awards & Seminars" data={undefined} onClickCallback={onClickCallbackAward} />}
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
                                    // pattern="(\d{4}-\d{4}-\d)"
                                    autoComplete="off"
                                    disabled
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
                                    autoComplete="off"
                                    disabled
                                    value={user?.user_family_name}

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
                                    autoComplete="off"
                                    disabled
                                    value={user?.user_first_name}
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
                                    autoComplete="off"
                                    disabled
                                    value={user?.user_middle_name}
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
                                    disabled
                                    value={user?.user_suffix}
                                />
                                <p className="absolute text-center w-full top-16 text-slate-600 text-xs font-bold">(E.G. SR, JR, III, IV, V)</p>
                            </section>
                        </section>
                    </section>
                </form>

                {/* Clubs, Seminars, and Achievements */}
                <section className="md:px-10 mt-10 flex flex-col gap-2">
                    <section className="flex justify-between">
                        <h1 className="pt-5 font-bold">Clubs, Seminars, and Achievements</h1>
                    </section>
                    <Container>
                        <Display>
                            {/* Clubs & Organizations */}
                            <Dropdown label="Clubs & Organization" items={clubAttr.organizations} />
                            {/* Club Positions */}
                            <Dropdown label="Position" items={clubAttr.positions} />
                            {/* Year Elected */}
                            <YearRange label="Year Elected" />
                        </Display>
                        <section className="flex justify-between items-center mt-5">
                            <p className="text-slate-600 text-xs font-bold">NOTE: ONLY FIVE (5)</p>
                            <button className="flex justify-center items-center border border-gray-500 px-2 py-2 rounded gap-2" onClick={(e: SyntheticEvent) => {
                                setAddAwards(false);
                                setAddClubs(true);
                            }}>
                                <BiPlus style={{ color: "black" }} />
                                <p>Add Clubs</p>
                            </button>
                        </section>

                        {clubData ?
                            <MembersTable nodes={clubData.clubs} columns={["Clubs & Organizations"]} mode={mode} onClickCallback={onClickCallback} />
                            :
                            <section className="flex justify-center">
                                <Spinner />
                            </section>
                        }
                        <hr className="my-5" />
                        <Display>
                            {/* Awards & Seminars*/}
                            <Dropdown label="Awards & Seminars" items={[{ id: "1", name: "Sample Seminar Held @ Davao City" }]} />
                            {/* Award Name */}
                            <Dropdown label="Award Name" items={[{ id: "1", name: "Participant" }]} />
                            {/* Year */}
                            <YearRange label="Year" />
                        </Display>
                        <section className="flex justify-between items-center mt-5">
                            <p className="text-slate-600 text-xs font-bold">NOTE: ONLY FIVE (5)</p>
                            <button className="flex justify-center items-center border border-gray-500 px-2 py-2 rounded gap-2" onClick={(e: SyntheticEvent) => {
                                setAddClubs(false);
                                setAddAwards(true);
                            }}>
                                <BiPlus style={{ color: "black" }} />
                                <p>Add Awards</p>
                            </button>
                        </section>
                        <MembersTable nodes={awards} columns={["Awards & Seminars", "Award Name / ETC", "Year"]} mode={mode} />

                    </Container>
                    {/* <section className="flex flex-row pt-5 gap-2 justify-end items-center">
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
                        </section> */}
                </section>
            </article >
        </>
    );
}
