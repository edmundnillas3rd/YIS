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

    const [statuses, setStatuses] = useState({
        yearbookStatuses: [],
        yearbookPaymentStatuses: []
    });
    const [status, setStatus] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<string>("");
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
            setStatuses({
                yearbookStatuses: data2['yearbookStatuses'],
                yearbookPaymentStatuses: data2['yearbookPaymentStatuses']
            });

            
            

            const foundStatus = data2['yearbookStatuses'].find((status: any) => status['name'] === data['yearbookStatus']);
            const foundPaymentStatus = data2['yearbookPaymentStatuses'].find((status: any) => status['name'] === data['paymentStatus']);
            
            setPaymentStatus(foundPaymentStatus['id']);
            setStatus(foundStatus['id']);
            setDate(data['dateReleased']);
            setCareOf(data['careOf']);
            setRelation(data['careOfRelation']);
            setAmount(data['fullPayment']);

            if (data?.yearbookStatus && data?.paymentStatus) {
                setCurrentStatus(data.yearbookStatus);
            }

        }
    }, [data, data2]);

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            yearbookID,
            amount,
            status,
            paymentStatus,
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
            case "amount":
                setAmount(target.value);
                break;
            case "status":
                
                setStatus(target.value);
                break;
            case "paymentStatus":
                

                setPaymentStatus(target.value);
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
                            label="STATUS"
                            name="status"
                            datas={statuses.yearbookStatuses}
                            value={status}
                            onChange={onChange}
                        />
                         <Dropdown
                            label="PAYMENT STATUS"
                            name="paymentStatus"
                            datas={statuses.yearbookPaymentStatuses}
                            value={paymentStatus}
                            onChange={onChange}
                        />
                         <Input
                            title="FULL PAYMENT"
                            id="amount"
                            pattern={"\\d+"}
                            onChange={onChange}
                            value={amount}
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