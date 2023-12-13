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
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [yearbookID, setYearbookID] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        if (data && data2) {
            setYearbookID(data['id']);
            setStatuses(data2);

            if (data?.yearbookStatus) {
                setCurrentStatus(data.yearbookStatus);
            }

            if (data2[0]) {
                console.log(data);

                setStatus(data2[0]['id']);
            }

        }
    }, [data, data2]);

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();


        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/${status}/${yearbookID}/status-update-yearbook`, {
                method: "PUT",
                credentials: "include",
            });

            if (response.ok) {
                navigate(0);
            }
        } catch (err) {
            console.error(err);
        }

    };

    const onChange = async (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        switch (target.name) {
            case "status":
                setStatus(target.value);
                break;
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
            <form method="PUT" onSubmit={onSubmitHandler}>
                <Dropdown
                    label="Status"
                    name="status"
                    datas={statuses}
                    value={status}
                    onChange={onChange}
                />

                <section className="flex flex-row justify-end mt-5">
                    <Button type="submit">Submit</Button>
                </section>
            </form>
        </Modal>
    );
}