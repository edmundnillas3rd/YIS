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
    const [name, setName] = useState<string>();
    const [acronym, setAcronym] = useState<string>();

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            

            setID(data['id']);
            setName(data['name']);
            setAcronym(data['acronym'])
        }

    }, [data]);

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "name":
                setName(target.value);
                break;
            case "acronym":
                setAcronym(target.value);
                break;
        }
    };

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            id,
            name,
            acronym
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/courses/update-department`, {
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
    };

    const onDelete = async (event: SyntheticEvent) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/courses/${id}/delete-department`, {
            method: "DELETE",
            credentials: "include"
        });

        if (response.ok) {
            navigate(0);
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
                    title="DEPARTMENT NAME"
                    id="name"
                    value={name}
                    onChange={onChange}
                />
                <Input
                    title="ACRONYM"
                    id="acronym"
                    value={acronym}
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