import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthProvider";
import { Input, Button } from "../components/Globals/index";
import Table from "../components/Table";
import Container from "../components/Container";
import AwardModal from "../components/AwardTable/AwardModal";
import AwardEditModal from "../components/AwardTable/AwardEditModal";

export default function () {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [disable, setDisable] = useState(true);
    
    // For clubs & organizations table
    const [currentClubNode, setCurrentClubNode] = useState(null);

    // For awards table
    const [currentAwardNode, setCurrentAwardNode] = useState(null);
    const [displayAwardForm, setDisplayAwardForm] = useState(false);
    const [displayAwardEdit, setDisplayAwardEdit] = useState(false);
    const [awardsData, setAwardsData] = useState(null);
    const [clubsData, setClubsData] = useState(null);

    useEffect(() => {
        (async () => {
            const userClubResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-club`, {
                credentials: "include"
            });

            const userAwardResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-award`, {
                credentials: "include"
            });


            const [clubsData, awardsData] = await Promise.all([userClubResponse.json(), userAwardResponse.json()]);
            
            if (clubsData && awardsData) {
                setClubsData(clubsData['clubs']);
                console.log(clubsData['clubs']);

                setAwardsData(awardsData['awards']);
                console.log(awardsData['awards']);
            }

        })();
    }, []);

    useEffect(() => {
        console.log("Current Award Node", currentAwardNode);

    }, [currentAwardNode]);

    // For organization table
    const orgDatas = Array.from({ length: 5 }, (v, i) => ({
        id: uuid(),
        organization: "Association of Student Assistants"
    }));

    const organizationHeaders = [
        "Organization"
    ];

    // For awards table
    // const awardDatas = Array.from({ length: 5 }, (v, i) => ({
    //     id: i + 1,
    //     name: "Davao Seminar",
    //     awardName: "Participant",
    //     dateAttended: "12/05/23"
    // }));

    const awardHeaders = [
        "Award & Seminar",
        "Award/ETC",
        "Date Attended"
    ];

    const onInputChangeHandler = (event: SyntheticEvent) => {
    };

    const onSubmitHandler = (event: SyntheticEvent) => {

    };

    const onClickOrganization = async (data: any) => {
        console.log("Org row clicked", data);
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

    const onCloseAddAward = async () => {
        setDisplayAwardForm(false);
    };

    const onCloseEditAward = async () => {
        setDisplayAwardEdit(false);
        setCurrentAwardNode(null);
    };

    return (
        <>
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
                {/* Organization */}
                <section className="flex flex-row gap-1 justify-between items-center">
                    <h3 className="opacity-60 font-bold">NOTE: ONLY FIVE ARE ALLOWED</h3>
                    <Button>Add Organization</Button>
                </section>
                {clubsData && <Table columns={organizationHeaders} datas={clubsData} onClickCallback={onClickOrganization} />}
                {/* Awards & Seminars */}
                <section className="flex flex-row gap-1 justify-between items-center">
                    <h3 className="opacity-60 font-bold">NOTE: ONLY FIVE ARE ALLOWED</h3>
                    <Button onClick={onClickAddAward}>Add Award/Seminar</Button>
                </section>
                {awardsData && <Table columns={awardHeaders} datas={awardsData} onClickCallback={onClickAward} />}
            </Container>
        </>

    );
}