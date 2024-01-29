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
    const [abbreviation, setAbbreviation] = useState<string>();
    const [department, setDepartment] = useState<string>();
    const [departments, setDepartments] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            // 

            setDepartments(data2);
            setID(data['id']);
            setName(data['name']);
            setAbbreviation(data['abbreviation']);

            const foundDepartment = data2.find((d: any) => d['acronym'] === data['acronym'])
            
            
            setDepartment(foundDepartment['id']);
        }

    }, [data]);

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "name":
                setName(target.value);
                break;
            case "abbreviation":
                setAbbreviation(target.value);
                break;
            case "department":
                setDepartment(target.value);
                break;
        }
    };

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            id,
            name,
            abbreviation,
            department
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/courses/update-course`, {
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
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/courses/${id}/delete-course`, {
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
                    title="FULL COURSE NAME"
                    id="name"
                    value={name}
                    onChange={onChange}
                />
                <Input
                    title="ABBREVATION"
                    id="abbreviation"
                    value={abbreviation}
                    onChange={onChange}
                />
                <Dropdown
                    label="DEPARTMENT"
                    name="department"
                    datas={departments}
                    value={department}
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