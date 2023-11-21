import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import MembersTable from "../components/CustomTable";
import Dropdown from "../components/Dropdown";
import YearRange from "../components/YearRange";
import Display from "../components/Display";
import Container from "../components/Container";
import PopupModal from "../components/StudentInformation/StudentInformationPopupModal";
import Spinner from "../components/Spinner";
import ClubFillupFormPopup from "../components/StudentInformation/ClubFillupFormPopup";
import AwardsFillupFormPopup from "../components/StudentInformation/AwardsFillupFormPopup";
import { AuthContext } from "../context/AuthProvider";

interface StudentBioProps {
    student: User;
}

const StudentBio = ({ student }: StudentBioProps) => {
    const regexInvalidSymbols = "[^\"\'\.\,\$\#\@\!\~\`\^\&\%\*\(\)\-\+\=\\\|\/\:\;\>\<\?]+";

    const [studentID, setStudentID] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [familyName, setFamilyName] = useState<string | null>(null);
    const [middleName, setMiddleName] = useState<string | null>(null);
    const [suffix, setSuffix] = useState<string | null>(null);

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

    useEffect(() => {
        // setErrorMsg("");
        // setMode("default");
    }, [studentID, firstName, familyName, middleName, suffix]);


    const onInputHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.currentTarget as HTMLInputElement;
        target.setCustomValidity("");
    };

    const onSubmitHandler = (event: SyntheticEvent) => {

    };


    return (
        <form method="post" onSubmit={onSubmitHandler}>
            <section>
                <section>
                    <h1 className="md:pl-10 pt-5 font-bold">Student Name</h1>
                </section>
                <section className="md:px-10 flex flex-wrap flex-col md:flex-row gap-7 md:gap-10">
                    {/* <section className="relative flex flex-col">
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
                    </section> */}
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
                            value={student.familyName}

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
                            value={student.firstName}
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
                            value={student.middleName}
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
                            value={student.suffix}
                        />
                        <p className="absolute text-center w-full top-16 text-slate-600 text-xs font-bold">(E.G. SR, JR, III, IV, V)</p>
                    </section>
                </section>
            </section>
        </form>
    );
};

export default function StudentInformation() {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [mode, setMode] = useState("default");
    const [loading, setLoading] = useState(false);
    const [addClubs, setAddClubs] = useState(false);
    const [addAwards, setAddAwards] = useState(false);

    const [clubAttr, setClubsAttr] = useState<ClubAttr>();
    const [clubData, setClubsData] = useState<any>();

    const [awardData, setAwardData] = useState<any>();

    const [errorMsg, setErrorMsg] = useState<string | null>(null);


    useEffect(() => {
        setLoading(true);

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
                const clubs = data.rows.map(({ club_id, organization, ...attr }: any) => ({ id: club_id, organization }));
                const clubData = data.rows;

                setClubsData({
                    clubs,
                    clubData
                });
            });

        fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-award`, {
            credentials: "include"
        })
            .then(response => response.json())
            .then((data: any) => {
                const awards = data.rows.map(({ awardID, ...attr}: any) => ({ ...attr }))
                setAwardData(awards);
            });

        setLoading(false);
    }, []);

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

    const [currentNode, setCurrentNode] = useState<any | null>(null);

    const onClubsClickCallback = (i: any) => {
        setCurrentNode(clubData.clubs.filter((d: any) => d.id === i.id)[0]);
    };

    const onClickCallbackPopup = (event: SyntheticEvent) => {
        setCurrentNode(null);
    };

    const onClickCallbackAddClub = async (event: SyntheticEvent) => {
        setAddClubs(false);
    };

    const onClickCallbackAward = async (event: SyntheticEvent) => {
        setAddAwards(false);
    };

    return (
        <>
            {currentNode && <PopupModal data={currentNode} onClickCallback={onClickCallbackPopup} />}
            {addClubs && <ClubFillupFormPopup name="Club Organization Information" data={undefined} onClickCallback={onClickCallbackAddClub} />}
            {addAwards && <AwardsFillupFormPopup name="Awards & Seminars" data={undefined} onClickCallback={onClickCallbackAward} />}
            <article className="flex flex-col p-10 gap-10">
                {/* General Information Section */}
                <section>
                    <h1 className="font-bold">GENERAL INFORMATION</h1>
                </section>
                {currentUser &&
                    <StudentBio student={currentUser} />
                }

                {/* Clubs, Seminars, and Achievements */}
                < section className="md:px-10 mt-10 flex flex-col gap-2">
                    <section className="flex justify-between">
                        <h1 className="pt-5 font-bold">Clubs, Seminars, and Achievements</h1>
                    </section>
                    <Container>
                        <Display>
                            {/* Clubs & Organizations */}
                            {/* {clubAttr && <Dropdown label="Clubs & Organization" items={clubAttr.organizations} />} */}
                            {/* Club Positions */}
                            {/* {clubAttr && <Dropdown label="Position" items={clubAttr.positions} />} */}
                            {/* Year Elected */}
                            {/* <YearRange label="Year Elected" /> */}
                        </Display>
                        <section className="flex justify-between items-center mt-5">
                            <p className="text-slate-600 text-xs font-bold">NOTE: ONLY FIVE (5)</p>
                            <button className="flex justify-center items-center border border-gray-500 px-2 py-2 rounded gap-2" onClick={(e: SyntheticEvent) => {
                                setAddAwards(false);
                                setAddClubs(true);
                            }}>
                                <AiOutlinePlus style={{ color: "black" }} />
                                <p>Add Clubs</p>
                            </button>
                        </section>

                        {clubData ?
                            <MembersTable nodes={clubData.clubs} columns={["Clubs & Organizations"]} mode={mode} onClickCallback={onClubsClickCallback} />
                            :
                            <section className="flex h-5 justify-center">
                                <Spinner />
                            </section>
                        }

                        <hr className="my-5" />

                        <Display>
                            {/* Awards & Seminars*/}
                            {/* <Dropdown label="Awards & Seminars" items={[{ id: "1", name: "Sample Seminar Held @ Davao City" }]} /> */}
                            {/* Award Name */}
                            {/* <Dropdown label="Award Name" items={[{ id: "1", name: "Participant" }]} /> */}
                            {/* Year */}
                            {/* <YearRange label="Year" /> */}
                        </Display>
                        <section className="flex justify-between items-center mt-5">
                            <p className="text-slate-600 text-xs font-bold">NOTE: ONLY FIVE (5)</p>
                            <button className="flex justify-center items-center border border-gray-500 px-2 py-2 rounded gap-2" onClick={(e: SyntheticEvent) => {
                                setAddClubs(false);
                                setAddAwards(true);
                            }}>
                                <AiOutlinePlus style={{ color: "black" }} />
                                <p>Add Awards</p>
                            </button>
                        </section>

                        {awardData && <MembersTable nodes={awardData} columns={["Awards & Seminars", "Award Name / ETC", "Year"]} mode={mode} />}

                    </Container>
                </section>
            </article >
        </>
    );
}
