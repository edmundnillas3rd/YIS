import { SyntheticEvent, useContext, useEffect, useState } from "react";
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

export default function () {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [disable, setDisable] = useState(true);
    const [clubProps, setClubProps] = useState(null);

    const [displayPreview, setDisplayPreview] = useState(false);

    // For clubs & organizations table
    const [currentOrgNode, setCurrentOrgNode] = useState(null);
    const [displayOrgForm, setDisplayOrgForm] = useState(false);
    const [displayOrgEdit, setDisplayOrgEdit] = useState(false);

    // For awards table
    const [currentAwardNode, setCurrentAwardNode] = useState(null);
    const [displayAwardForm, setDisplayAwardForm] = useState(false);
    const [displayAwardEdit, setDisplayAwardEdit] = useState(false);
    const [awardsData, setAwardsData] = useState(null);
    const [clubsData, setClubsData] = useState(null);

    // For seminars table

    useEffect(() => {
        (async () => {
            const clubsRouteResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs`);
            const userClubResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-club`, {
                credentials: "include"
            });

            const userAwardResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-award`, {
                credentials: "include"
            });

            const [indexData, clubsData, awardsData] = await Promise.all([
                clubsRouteResponse.json(),
                userClubResponse.json(),
                userAwardResponse.json()
            ]);

            if (indexData && clubsData && awardsData) {
                setClubProps(indexData);
                setClubsData(clubsData['clubs']);
                setAwardsData(awardsData['awards']);
            }

        })();
    }, []);

    const organizationHeaders = [
        "Organization"
    ];

    const awardHeaders = [
        "Award & Seminar",
        "Award/ETC",
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

    const onClosePreview = async () => {
        setDisplayPreview(false);
    };

    const onClickAward = async (data: any) => {
        console.log("Award row clicked", data);
        setDisplayAwardEdit(true);
        setCurrentAwardNode(data);
    };

    const onClickAddAward = async (event: SyntheticEvent) => {
        console.log("Add new award");
        setDisplayAwardForm(true);
    };

    const onCloseEditOrg = async () => {
        setDisplayOrgEdit(false);
        setCurrentOrgNode(null);
        console.log("Current Org node", currentOrgNode);

    };

    const onCloseAddAward = async () => {
        setDisplayAwardForm(false);
    };

    const onCloseEditAward = async () => {
        setDisplayAwardEdit(false);
        setCurrentAwardNode(null);
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

            {/* Temporary fill in the modal */}
            <SeminarModal
                hasCloseBtn={true}
                isOpen={false}
                onClose={() => {}}
                data={null}
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
                        />
                        <Input
                            title="FIRST NAME"
                            id="first-name"
                            onChange={onInputChangeHandler}
                            value={currentUser['firstName']}
                            disabled={disable}
                        />
                        <Input
                            title="MIDDLE NAME"
                            id="middle-name"
                            onChange={onInputChangeHandler}
                            value={currentUser['middleName']}
                            disabled={disable}
                        />
                        <Input
                            title="SUFFIX"
                            id="suffix"
                            onChange={onInputChangeHandler}
                            value={currentUser['suffix']}
                            disabled={disable}
                        />
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
                    <Button onClick={onClickAddAward}>Add Award/Seminar</Button>
                </section>
                {awardsData && <Table columns={awardHeaders} datas={awardsData} onClickCallback={onClickAward} />}
                {/* Seminars */}
            </Container>
        </>

    );
}