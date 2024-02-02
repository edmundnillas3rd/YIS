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
    const [schoolID, setSchoolID] = useState<string>();
    const [schoolYear, setSchoolYear] = useState<string>();
    const [password, setPassword] = useState<string>('');
    const [course, setCourse] = useState<string>();

    const [courses, setCourses] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            


            setID(data['id']);
            setFirstName(data['firstName']);
            setFamilyName(data['familyName']);
            setMiddleName(data['middleName']);
            setSuffix(data['suffix']);
            setSchoolYear(data['schoolYear']);
            setSchoolID(data['schoolID']);


            const foundCourse = data2.find((c: any) => c['abbreviation'] === data['course']);

            

            setCourse(foundCourse?.id ? foundCourse.id : '');
            setCourses(data2);
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
            case "schoolID":
                setSchoolID(target.value);
                break;
            case "password":
                setPassword(target.value);
                break;
            case "schoolYear":
                setSchoolYear(target.value);
                break;
            case "course":
                setCourse(target.value);
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
            schoolID,
            password,
            schoolYear,
            course
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/update-student-info`, {
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
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${id}/delete-student`, {
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
                <Dropdown
                    label="COURSE"
                    name="course"
                    datas={courses}
                    value={course}
                    onChange={onChange}
                />
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
                    title="SCHOOL YEAR"
                    id="schoolYear"
                    value={schoolYear}
                    onChange={onChange}
                />
                <Input
                    title="SCHOOL ID"
                    id="schoolID"
                    value={schoolID}
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