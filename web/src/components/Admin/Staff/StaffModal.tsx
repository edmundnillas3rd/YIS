import { useState, SyntheticEvent, useEffect } from "react";
import { Button, Dropdown, Input, Modal } from "../../Globals";
import { useNavigate } from "react-router-dom";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
    data,
    data2
}: ModalProps) {

    const [id, setID] = useState<string>();
    const [firstName, setFirstName] = useState<string>();
    const [familyName, setFamilyName] = useState<string>();
    const [middleName, setMiddleName] = useState<string>();
    const [suffix, setSuffix] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            console.log(data);

            setID(data['id']);
            setFirstName(data['firstName']);
            setFamilyName(data['familyName']);
            setMiddleName(data['middleName']);
            setEmail(data['email']);
            setSuffix(data['suffix']);
        }

    }, [data]);

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();

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

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            id,
            firstName,
            familyName,
            middleName,
            suffix,
            email,
            password,
        };

        console.log(data);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/update-coadmin-info`, {
                method: "PUT",
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

    const onDelete = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${id}/delete-coadmin`, {
                method: "DELETE",
                credentials: "include"
            });

            if (response.ok) {
                navigate(0);
            }
        } catch (error) {
            console.error(error);

        }

    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
            data={data}
        >
            <section className="flex flex-col gap-2">
                <Input
                    title="FIRST NAME"
                    id="firstName"
                    value={firstName}
                    onChange={onChange}
                />
                <Input
                    title="FAMILY NAME"
                    id="familyName"
                    value={familyName}
                    onChange={onChange}
                />
                <Input
                    title="MIDDLE NAME"
                    id="middleName"
                    value={middleName}
                    onChange={onChange}
                />
                <Input
                    title="SUFFIX"
                    id="suffix"
                    value={suffix}
                    onChange={onChange}
                />
                <Input
                    title="EMAIL"
                    id="email"
                    value={email}
                    onChange={onChange}
                />
                <Input
                    title="PASSWORD"
                    id="password"
                    type="password"
                    value={password}
                    onChange={onChange}
                />
                <section className="flex flex-row justify-end gap-1">
                    <Button onClick={onDelete}>Delete</Button>
                    <Button onClick={onSubmit}>Submit</Button>
                </section>
            </section>

        </Modal>
    );
}