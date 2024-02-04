import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Dropdown, Input, Modal } from "../Globals";
import { useNavigate } from "react-router-dom";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
    data,
    data2,
    data3
}: ModalProps) {

    const [statuses, setStatuses] = useState([]);
    const [paymentStatuses, setPaymentStatuses] = useState([]);
    const [fullName, setFullName] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<string>("");
    const [date, setDate] = useState<string>();
    const [student, setStudent] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data2) {
            console.log(data);
            setStudent(data);
            setFullName(data['fullName']);
            setStatuses(data2);
            setPaymentStatuses(data3);

            setDate(data['dateReleased']);
            if (data2[0]) {
                const s = data2.find((s: any) => data['yearbookStatus'] === s['name']);
                if (s) {
                    setStatus(s['id'] as any);
                } else {
                    setStatus(data2[0]['id'])
                }
            }

            if (data3[0]) {
                const ps = data3.find((ps: any) => data['paymentStatus'] === ps['name']);

                if (ps) {
                    setPaymentStatus(ps['id'] as any);
                } else {
                    setPaymentStatus(data3[0]['id'])
                }
            }
        }
    }, [data, data2, data3]);

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        switch (target.name) {
            case "fullName":
                setFullName(target.value);
                break;
            case "paymentStatus":
                setPaymentStatus(target.value);
                break;
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
                fullName,
                status,
                paymentStatus,
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
                <Input
                    title="FULL NAME"
                    id="fullName"
                    value={fullName}
                    onChange={onChange}
                />
                <Dropdown
                    label="YEARBOOK PHOTOS STATUS"
                    name="yearbookStatus"
                    datas={statuses}
                    value={status}
                    onChange={onChange}
                />
                <Dropdown
                    label="PAYMENT STATUS"
                    name="paymentStatus"
                    datas={paymentStatuses}
                    value={paymentStatus}
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