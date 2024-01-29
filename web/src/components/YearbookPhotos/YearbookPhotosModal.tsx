import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Dropdown, Input, Modal } from "../Globals";
import { useNavigate } from "react-router-dom";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
    data,
    data2
}: ModalProps) {

    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState<string>("");
    const [date, setDate] = useState<string>();
    const [student, setStudent] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data2) {
            
            
            setStudent(data);
            setStatuses(data2);
            setDate(data['dateReleased'])
            if (data2[0]) {
                const s = data2.find((s: any) => data['yearbookStatus'] === s['name']);
                if (s) {
                    setStatus(s['id'] as any);
                }
            }
        }
    }, [data, data2]);

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        switch (target.name) {
            case "yearbookStatus":
                setStatus(target.value);
                break;
            case "dateReturned":
                setDate(target.value);
                break;
        }
    };

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (student && status) {
            const { id } = student;

            const data = {
                id,
                status,
                date
            };

            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/status-update-photos`, {
                    method: "PUT",
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

        } else {
            

        }
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            {student && <section className="flex flex-col gap-1 mb-5">
                <h3 className="font-bold">{student['fullName']}</h3>
            </section>}
            <form
                method="POST"
                onSubmit={onSubmitHandler}
            >
                <Dropdown
                    label="YEARBOOK STATUS"
                    name="yearbookStatus"
                    datas={statuses}
                    value={status}
                    onChange={onChange}
                />
                <Input
                    title="DATE RETURNED"
                    id="dateReturned"
                    value={date}
                    type="date"
                    onChange={onChange}
                />
                <section className="flex flex-row justify-end mt-5">
                    <Button type="submit">Update</Button>
                </section>
            </form>
        </Modal>
    );
}