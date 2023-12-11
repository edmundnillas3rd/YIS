import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "../Globals";
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
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [student, setStudent] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data2) {
            console.log(data);
            
            setStudent(data);
            setStatuses(data2);
            if (data2[0]) {
                setCurrentStatus(data['yearbookStatus']);
            }
        }
    }, [data, data2]);

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        setStatus(target.value);
    };

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (student) {
            const { id } = student;
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/${status}/${id}/status-update`, {
                method: "PUT"
            });

            if (response.ok) {
                navigate(0);
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <section className="flex flex-col gap-1 mb-5">
                <p className="font-bold">CURRENT YEARBOOK STATUS</p>
                <p>{currentStatus}</p>
            </section>
            <form
                method="POST"
                onSubmit={onSubmit}
            >
                <Dropdown
                    label="Yearbook Status"
                    name="yearbookStatus"
                    datas={statuses}
                    value={status}
                    onChange={onChange}
                />

                <section className="flex flex-row justify-end mt-5">
                    <Button type="submit">Update</Button>
                </section>
            </form>
        </Modal>
    );
}