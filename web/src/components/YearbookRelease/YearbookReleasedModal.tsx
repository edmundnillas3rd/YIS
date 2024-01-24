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
    const [date, setDate] = useState<string>("");
    const [careOf, setCareOf] = useState<string>();
    const [relation, setRelation] = useState<string>();

    const navigate = useNavigate();

    useEffect(() => {
        if (data && data2) {
            setYearbookID(data['id']);
            setStatuses(data2);

            const foundStatus = data2.find((status: any) => status.name === data['yearbookStatus']);
            setStatus(foundStatus['id']);
            setDate(data['dateReleased']);
            setCareOf(data['careOf']);
            setRelation(data['careOfRelation'])

            if (data?.yearbookStatus) {
                setCurrentStatus(data.yearbookStatus);
            }

        }
    }, [data, data2]);

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            yearbookID,
            status,
            date,
            careOf,
            relation
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/status-update-yearbook`, {
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
            case "dateReleased":
                setDate(target.value);
                break;
            case "careof":
                setCareOf(target.value);
                break;
            case "relation":
                setRelation(target.value);
                break;
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            {data && data2 && (
                <>
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
                        <Input
                            title="DATE RELEASED"
                            id="dateReleased"
                            type="date"
                            onChange={onChange}
                            value={date}
                        />
                        <Input
                            title="CARE OF"
                            id="careof"
                            onChange={onChange}
                            value={careOf}
                        />
                        <Input
                            title="RELATION"
                            id="relation"
                            onChange={onChange}
                            value={relation}
                        />
                        <section className="flex flex-row justify-end mt-5">
                            <Button type="submit">Submit</Button>
                        </section>
                    </form>
                </>
            )}
        </Modal>
    );
}