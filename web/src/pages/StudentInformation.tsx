import { SyntheticEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Input from "../components/globals/Input";
import Container from "../components/Container";
import Table from "../components/Table";
import Button from "../components/globals/Button";

export default function () {
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [disable, setDisable] = useState(true);

    // For organization table
    const orgDatas = Array.from({ length: 5 }, (v, i) => ({
        id: i,
        organization: "Association of Student Assistants"
    }));

    const organizationHeaders = [
        "Organization"
    ];

    // For awards table
    const awardDatas = Array.from({ length: 5 }, (v, i) => ({
        id: i,
        name: "Davao Seminar",
        awardName: "Participant",
        dateAttended: "12/05/23"
    }));

    const awardHeaders = [
        "Award & Seminar",
        "Award/ETC",
        "Date Attended"
    ];

    const onInputChangeHandler = (event: SyntheticEvent) => {
    };

    const onSubmitHandler = (event: SyntheticEvent) => {

    };

    const onClickAddOrganization = async (event: SyntheticEvent) => {
        event.preventDefault();
        console.log("Add new organization");
    };

    const onClickAddAward = async (event: SyntheticEvent) => {
        event.preventDefault();
        console.log("Add new award");
    };

    return (
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
                <h3 className="opacity-60">NOTE: ONLY FIVE ARE ALLOWED</h3>
                <Button>Add Organization</Button>
            </section>
            {orgDatas && <Table columns={organizationHeaders} datas={orgDatas} onClickCallback={onClickAddOrganization} />}
            {/* Awards & Seminars */}
            <section className="flex flex-row gap-1 justify-between items-center">
                <h3 className="opacity-60">NOTE: ONLY FIVE ARE ALLOWED</h3>
                <Button>Add Award/Seminar</Button>
            </section>
            {awardDatas && <Table columns={awardHeaders} datas={awardDatas} onClickCallback={onClickAddOrganization} />}
        </Container>
    );
}