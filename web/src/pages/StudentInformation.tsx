import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { FaEye, FaSave } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import {
    Input,
    Button,
    Table,
    Container,
    Toggle,
    Confirm,
    Dropdown
} from "../components/Globals/index";

import OrganizationModal from "../components/OrganizationTable/OrganizationModal";
import AwardModal from "../components/AwardTable/AwardModal";
import AwardEditModal from "../components/AwardTable/AwardEditModal";
import OrganizationEditModal from "../components/OrganizationTable/OrganizationEditModal";
import PreivewModal from "../components/StudentInformation/PreivewModal";
import SeminarModal from "../components/SeminarTable/SeminarModal";
import SeminarEdit from "../components/SeminarTable/SeminarEdit";
import { capitalizeRegex, suffixRegex } from "../utilities/regex";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function () {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [clubProps, setClubProps] = useState(null);
    const [courses, setCourses] = useState(null);

    const [displayPreview, setDisplayPreview] = useState(false);
    const [confirmSave, setConfirmSave] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const navigate = useNavigate();

    const [student, setStudent] = useState<Student>();

    // For clubs & organizations table
    const [currentOrgNode, setCurrentOrgNode] = useState(null);
    const [displayOrgForm, setDisplayOrgForm] = useState(false);
    const [displayOrgEdit, setDisplayOrgEdit] = useState(false);
    const [clubsData, setClubsData] = useState(null);

    // For awards table
    const [currentAwardNode, setCurrentAwardNode] = useState(null);
    const [displayAwardForm, setDisplayAwardForm] = useState(false);
    const [displayAwardEdit, setDisplayAwardEdit] = useState(false);
    const [awardsData, setAwardsData] = useState(null);

    // For seminars table
    const [currentSeminarNode, setCurrentSeminarNode] = useState(null);
    const [displaySeminarForm, setDisplaySeminarForm] = useState(false);
    const [displayEditSeminar, setDisplayEditSeminar] = useState(false);
    const [seminarsData, setSeminarsData] = useState(null);

    useEffect(() => {
        (async () => {
            const clubsRouteResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs`);
            const userClubResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-club`, {
                credentials: "include"
            });

            const userAwardResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-award`, {
                credentials: "include"
            });

            const userSeminarResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-seminar`, {
                credentials: "include"
            });

            const coursesResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`, {
                credentials: "include"
            })

            const [indexData, clubsData, awardsData, seminarsData, coursesData] = await Promise.all([
                clubsRouteResponse.json(),
                userClubResponse.json(),
                userAwardResponse.json(),
                userSeminarResponse.json(),
                coursesResponse.json()
            ]);

            if (indexData && clubsData && awardsData && seminarsData && coursesData) {
                setClubProps(indexData);
                setClubsData(clubsData['clubs'].map((club: any) => ({ uuid: uuid(), ...club })));
                setAwardsData(awardsData['awards'].map((award: any) => ({ uuid: uuid(), ...award })));
                setSeminarsData(seminarsData['seminars'].map((seminar: any) => ({ uuid: uuid(), ...seminar })));
                setCourses(coursesData['courses'])
            }

        })();
    }, []);

    useEffect(() => {
        console.log(currentUser);
        if (currentUser) {
            setStudent({
                firstName: currentUser.firstName,
                familyName: currentUser.familyName,
                middleName: currentUser.middleName,
                suffix: currentUser.suffix
            });
        }
    }, [currentUser]);

    const organizationHeaders = [
        "Organization"
    ];

    const awardHeaders = [
        "Award Name",
        "Awards/(Place, Role, etc.)",
        "Date Attended"
    ];

    const seminarsHeaders = [
        "Seminar",
        "Role",
        "Date Attended"
    ];

    const onInputChangeHandler = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        console.log(target.value);

        switch (target.name) {
            case "first-name":
                setStudent((state: any) => ({
                    ...state,
                    firstName: target.value
                }));
                break;
            case "middleName":
                console.log(target.value);

                setStudent((state: any) => ({
                    ...state,
                    middleName: target.value
                }));
                break;
            case "family-name":
                setStudent((state: any) => ({
                    ...state,
                    familyName: target.value
                }));
                break;
            case "suffix":
                setStudent((state: any) => ({
                    ...state,
                    suffix: target.value
                }));
                break;
            case "course":
                setStudent((state: any) => ({
                    ...state,
                    course: target.value
                }))
                break;
        }
    };

    const onSubmitHandler = (event: SyntheticEvent) => {

    };

    const onClickPreview = async (event: SyntheticEvent) => {
        event.preventDefault();
        setDisplayPreview(true);
    };

    const onClosePreview = async () => {
        setDisplayPreview(false);
    };

    const onClickOrganization = async (data: any) => {
        console.log("Org row clicked", data);
        setDisplayOrgEdit(true);
        setCurrentOrgNode(data);
    };

    const onClickAddOrg = async (event: SyntheticEvent) => {
        event.preventDefault();
        setDisplayOrgForm(true);
    };

    const onCloseAddOrg = async () => {
        setDisplayOrgForm(false);
    };

    const onClickAward = async (data: any) => {
        console.log("Award row clicked", data);
        setDisplayAwardEdit(true);
        setCurrentAwardNode(data);
    };

    const onClickAddAward = async (event: SyntheticEvent) => {
        event.preventDefault();
        console.log("Add new award");
        setDisplayAwardForm(true);
    };

    const onCloseAddAward = async () => {
        setDisplayAwardForm(false);
    };

    const onCloseEditOrg = async () => {
        setDisplayOrgEdit(false);
        setCurrentOrgNode(null);
        console.log("Current Org node", currentOrgNode);

    };

    const onCloseEditAward = async () => {
        setDisplayAwardEdit(false);
        setCurrentAwardNode(null);
    };

    const onClickSeminar = async (data: any) => {
        console.log("Seminar row clicked", data);
        setDisplayEditSeminar(true);
        setCurrentSeminarNode(data);
    };

    const onClickAddSeminar = async (event: SyntheticEvent) => {
        event.preventDefault();
        console.log("Add new seminar");
        setDisplaySeminarForm(true);
    };

    const onCloseAddSeminar = async () => {
        setDisplaySeminarForm(false);
    };

    const onCloseEditSeminar = async () => {
        setDisplayEditSeminar(false);
        setCurrentSeminarNode(null);
    };

    const onClickSave = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);
        setDisable(true);
        console.log(student);

        if (student?.familyName && student?.firstName && student?.middleName) {

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/update-name`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            });

            if (response.ok) {
                setLoading(false);
                console.log("Successfully updated user entry");
                navigate(0);
            }
        }
    };

    const onEditChange = (state: any) => {
        setDisable(!state);
        setConfirmSave(false);
    };

    return (
        <>
            <PreivewModal
                hasCloseBtn={true}
                isOpen={displayPreview}
                onClose={onClosePreview}
            />
            <OrganizationModal
                hasCloseBtn={true}
                isOpen={displayOrgForm}
                onClose={onCloseAddOrg}
                data={clubProps}
            />
            <OrganizationEditModal
                hasCloseBtn={true}
                isOpen={displayOrgEdit}
                onClose={onCloseEditOrg}
                data={clubProps}
                data2={currentOrgNode}
            />
            <AwardModal
                hasCloseBtn={true}
                isOpen={displayAwardForm}
                onClose={onCloseAddAward}
            />
            <AwardEditModal
                hasCloseBtn={true}
                isOpen={displayAwardEdit}
                onClose={onCloseEditAward}
                data={currentAwardNode}
            />

            <SeminarModal
                hasCloseBtn={true}
                isOpen={displaySeminarForm}
                onClose={onCloseAddSeminar}
            />
            <SeminarEdit
                hasCloseBtn={true}
                isOpen={displayEditSeminar}
                onClose={onCloseEditSeminar}
                data={currentSeminarNode}
            />

            <Container>
                <section className="flex flex-row items-center justify-between">
                    <h3 className="font-bold mb-5">Student Information</h3>
                    <section>
                        <Toggle name="Edit" icon={<MdEdit />} onChange={onEditChange}>
                            {(!confirmSave) && (
                                <Button onClick={(e: any) => { setConfirmSave(true); }}>
                                    Save
                                    <FaSave />
                                </Button>
                            )}
                            {confirmSave && (
                                <Confirm
                                    onConfirm={onClickSave}
                                    onCancel={(e: any) => setConfirmSave(false)}
                                />
                            )}
                        </Toggle>
                    </section>
                </section>
                {student && (
                    <form
                        className="flex flex-col md:flex-row flex-wrap gap-2"
                        method="POST"
                        onSubmit={onSubmitHandler}>
                        <Input
                            title="FAMILY NAME"
                            id="family-name"
                            onChange={onInputChangeHandler}
                            value={student["familyName"]}
                            disabled={disable}
                            autoComplete="family-name"
                            pattern={capitalizeRegex}
                            min={3}
                            max={45}
                            required

                        />
                        <Input
                            title="FIRST NAME"
                            id="first-name"
                            onChange={onInputChangeHandler}
                            value={student["firstName"]}
                            disabled={disable}
                            autoComplete="first-name"
                            pattern={capitalizeRegex}
                            min={3}
                            max={45}
                            required

                        />
                        <section className="flex flex-col gap-1 items-center ">
                            <Input
                                title="MIDDLE NAME"
                                id="middleName"
                                onChange={onInputChangeHandler}
                                value={student["middleName"]}
                                disabled={disable}
                                pattern={capitalizeRegex}
                                min={3}
                                max={45}
                                required
                                width="w-full"
                            />
                            <span className="text-zinc-500 font-bold">(NOTE: SPELL OUT THE MIDDLE NAME)</span>
                        </section>
                        <section className="flex flex-col gap-1 items-center">
                            <Input
                                title="SUFFIX"
                                id="suffix"
                                onChange={onInputChangeHandler}
                                value={student['suffix']}
                                disabled={disable}
                                pattern={suffixRegex}
                                min={3}
                                max={45}
                                width="w-full"

                            />
                            <p className="text-zinc-500 font-bold">EX. SR, JR, I, II, III</p>
                        </section>
                        <Dropdown
                            label="COURSES"
                            name="course"
                            datas={courses}
                        />
                    </form>
                )}

                {/* Organization */}
                <section className="flex flex-row gap-1 justify-between items-center">
                    <h3 className="opacity-60 font-bold">NOTE: ONLY FIVE ARE ALLOWED</h3>
                    <section className="flex flex-row gap-1">
                        <Button onClick={onClickAddOrg}>Add Organization</Button>
                        <Button onClick={onClickAddAward}>Add Award</Button>
                        <Button onClick={onClickAddSeminar}>Add Seminar</Button>
                        <Button
                            onClick={onClickPreview}
                        >
                            Preview
                            <FaEye />
                        </Button>
                    </section>
                </section>
                {clubsData && <Table columns={organizationHeaders} datas={clubsData} onClickCallback={onClickOrganization} />}
                {/* Awards */}
                <section className="flex flex-row gap-1 justify-between items-center">
                    <h3 className="opacity-60 font-bold">NOTE: ONLY FIVE ARE ALLOWED</h3>

                </section>
                {awardsData && <Table columns={awardHeaders} datas={awardsData} onClickCallback={onClickAward} />}
                {/* Seminars */}
                <section className="flex flex-row gap-1 justify-between items-center">
                    <h3 className="opacity-60 font-bold">NOTE: ONLY FIVE ARE ALLOWED</h3>


                </section>
                {seminarsData && <Table columns={seminarsHeaders} datas={seminarsData} onClickCallback={onClickSeminar} />}

            </Container>
        </>

    );
}