import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import {
    Input,
    Button,
    Table,
    Container
} from "../components/Globals/index";

import OrganizationModal from "../components/OrganizationTable/OrganizationModal";
import AwardModal from "../components/AwardTable/AwardModal";
import AwardEditModal from "../components/AwardTable/AwardEditModal";
import OrganizationEditModal from "../components/OrganizationTable/OrganizationEditModal";
import PreivewModal from "../components/StudentInformation/PreivewModal";
import SeminarModal from "../components/SeminarTable/SeminarModal";
import SeminarEdit from "../components/SeminarTable/SeminarEdit";
import { capitalizeRegex, suffixRegex } from "../utilities/regex";

export default function () {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [disable, setDisable] = useState(true);
    const [clubProps, setClubProps] = useState(null);

    const [displayPreview, setDisplayPreview] = useState(false);

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

            const [indexData, clubsData, awardsData, seminarsData] = await Promise.all([
                clubsRouteResponse.json(),
                userClubResponse.json(),
                userAwardResponse.json(),
                userSeminarResponse.json()
            ]);

            if (indexData && clubsData && awardsData && seminarsData) {
                setClubProps(indexData);
                setClubsData(clubsData['clubs'].map((club: any) => ({ uuid: uuid(), ...club })));
                setAwardsData(awardsData['awards'].map((award: any) => ({ uuid: uuid(), ...award })));
                setSeminarsData(seminarsData['seminars'].map((seminar: any) => ({ uuid: uuid(), ...seminar })));
            }

        })();
    }, []);

    const organizationHeaders = [
        "Organization"
    ];

    const awardHeaders = [
        "Award",
        "Award/ETC",
        "Date Attended"
    ];

    const seminarsHeaders = [
        "Seminar",
        "Role",
        "Date Attended"
    ];

    const onInputChangeHandler = (event: SyntheticEvent) => {
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
                <section>
                    <h3 className="font-bold mb-5">Student Information</h3>
                </section>
                {currentUser && (
                    <form
                        className="flex flex-col md:flex-row flex-wrap gap-2"
                        method="POST"
                        onSubmit={onSubmitHandler}>
                        <Input
                            title="FAMILY NAME"
                            id="family-name"
                            onChange={onInputChangeHandler}
                            value={currentUser['familyName']}
                            disabled={disable}
                            autoComplete="family-name"
                            pattern={"[a-zA-Z]{3}{45}"}
                            min={3}
                            max={45}
                            required
                        />
                        <Input
                            title="FIRST NAME"
                            id="first-name"
                            onChange={onInputChangeHandler}
                            value={currentUser['firstName']}
                            disabled={disable}
                            autoComplete="first-name"
                            pattern={"[a-zA-Z]{3}{45}"}
                            min={3}
                            max={45}
                            required
                        />
                        <section className="flex flex-col gap-1 items-center ">
                            <Input
                                title="MIDDLE NAME"
                                id="middleName"
                                onChange={onInputChangeHandler}
                                value={currentUser['middleName']}
                                disabled={disable}
                                pattern={capitalizeRegex}
                                min={3}
                                max={45}
                                required={true}
                            />
                            <p className="text-zinc-500 font-bold">(NOTE: SPELL OUT THE MIDDLE NAME)</p>
                        </section>
                        <section className="flex flex-col gap-1 items-center">
                            <Input
                                title="SUFFIX"
                                id="suffix"
                                onChange={onInputChangeHandler}
                                value={currentUser['suffix']}
                                disabled={disable}
                                pattern={suffixRegex}
                                min={3}
                                max={45}
                                required={true}
                            />
                            <p className="text-zinc-500 font-bold">EX. SR, JR, I, II, III</p>
                        </section>
                    </form>
                )}
                <section className="flex flex-row gap-1 justify-end items-center mb-5">
                    <Button
                        onClick={onClickPreview}
                    >
                        Preview
                        <FaEye />
                    </Button>
                </section>
                {/* Organization */}
                <section className="flex flex-row gap-1 justify-between items-center">
                    <h3 className="opacity-60 font-bold">NOTE: ONLY FIVE ARE ALLOWED</h3>
                    <Button onClick={onClickAddOrg}>Add Organization</Button>
                </section>
                {clubsData && <Table columns={organizationHeaders} datas={clubsData} onClickCallback={onClickOrganization} />}
                {/* Awards */}
                <section className="flex flex-row gap-1 justify-between items-center">
                    <h3 className="opacity-60 font-bold">NOTE: ONLY FIVE ARE ALLOWED</h3>
                    <Button onClick={onClickAddAward}>Add Award</Button>
                </section>
                {awardsData && <Table columns={awardHeaders} datas={awardsData} onClickCallback={onClickAward} />}
                {/* Seminars */}
                <section className="flex flex-row gap-1 justify-between items-center">
                    <h3 className="opacity-60 font-bold">NOTE: ONLY FIVE ARE ALLOWED</h3>
                    <Button onClick={onClickAddSeminar}>Add Seminar</Button>

                </section>
                {seminarsData && <Table columns={seminarsHeaders} datas={seminarsData} onClickCallback={onClickSeminar} />}

            </Container>
        </>

    );
}