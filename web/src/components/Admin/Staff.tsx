import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Container, Dropdown, Input, Table } from "../Globals";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import StaffModel from "./Staff/StaffModal";

export default function () {

    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [familyName, setFamilyName] = useState<string>("");
    const [suffix, setSuffix] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [staffs, setStaffs] = useState([]);
    const [rawData, setRawData] = useState([]);

    const [currentNode, setCurrentNode] = useState<any>();

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const courseResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);
                const userCOAdminResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);

                const [courseData, userStudentsData] = await Promise.all([
                    courseResponse.json(),
                    userCOAdminResponse.json()
                ]);

                const { courses } = courseData;
                const { coadminUsers } = userStudentsData;


                if (coadminUsers) {
                    setStaffs(coadminUsers.map(({ ...attr }: any) => ({ uuid: uuid(), ...attr })));
                    setRawData(coadminUsers);
                }


            } catch (error) {
                console.error(error);
            }
        })();

    }, []);

    const attr = [
        "FIRST NAME",
        "MIDDLE NAME",
        "FAMILY NAME",
        "SUFFIX",
        "EMAIL"
    ];

    const onChange = async (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "firstName":
                setFirstName(target.value);
                break;
            case "middleName":
                setMiddleName(target.value);
                break;
            case "familyName":
                setFamilyName(target.value);
                break;
            case "suffix":
                setSuffix(target.value);
                break;
            case "email":
                setEmail(target.value);
                break;
            case "password":
                setPassword(target.value);
                break;
        }
    };

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            firstName,
            middleName,
            familyName,
            suffix,
            email,
            password
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/coadmin-signup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                navigate(0);
            }
        } catch (error) {
            console.error(error);

        }
    };

    const onClickHandler = async (data: any) => {
        setCurrentNode(rawData.find((d: any) => d.id === data.id));
    };

    const onCloseModal = async () => {
        setCurrentNode(null);
    };

    return (
        <>
            <StaffModel
                hasCloseBtn={true}
                isOpen={!!currentNode}
                onClose={onCloseModal}
                data={currentNode}
            />
            <Container>

                <form method="POST" onSubmit={onSubmitHandler}>
                    <section className="flex flex-row gap-1">
                        <Input
                            title="FIRST NAME"
                            id="firstName"
                            onChange={onChange}
                        />
                        <Input
                            title="MIDDLE NAME"
                            id="middleName"
                            onChange={onChange}
                        />
                        <Input
                            title="FAMILY NAME"
                            id="familyName"
                            onChange={onChange}
                        />
                        <Input
                            title="SUFFIX"
                            id="suffix"
                            onChange={onChange}
                        />
                    </section>
                    <section className="flex flex-row gap-1">
                        <Input
                            title="EMAIL"
                            id="email"
                            onChange={onChange}
                        />
                        <Input
                            title="PASSWORD"
                            id="password"
                            type="password"
                            onChange={onChange}
                        />
                    </section>

                    <section className="flex flex-auto flex-row justify-end p-5">
                        <Button>Add</Button>
                    </section>
                </form>
                {
                    staffs && (
                        <Table
                            key={staffs.length}
                            onClickCallback={onClickHandler}
                            columns={attr}
                            datas={staffs}
                        />
                    )
                }

            </Container>
        </>

    );
}