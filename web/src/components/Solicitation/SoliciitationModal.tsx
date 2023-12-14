import { SyntheticEvent, useEffect, useState } from "react";
import {
    Button,
    Confirm,
    Dropdown,
    Input,
    Modal,
    Toggle
} from "../Globals";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
    data,
    data2
}: ModalProps) {

    const [soli, setSoli] = useState();
    const [statuses, setStatuses] = useState();
    const [paymentStatuses, setPaymentStatuses] = useState();

    const [id, setID] = useState<string>();
    const [status, setStatus] = useState<string>();
    const [dateReturned, setDateReturned] = useState<string>();
    const [paymentStatus, setPaymentStatus] = useState<string>();
    const [paymentAmount, setPaymentAmount] = useState<string>();
    const [ornumber, setORNumber] = useState<string>();
    const [soliNumber, setSoliNumber] = useState<string>();

    const [disable, setDisable] = useState<boolean>(false);
    const [confirmSave, setConfirmSave] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data2) {
            console.log(data);
            
            setSoli(data);
            setStatuses(data2.statuses);
            setPaymentStatuses(data2.yearbookPaymentStatuses);

            const filteredStatus = data2.statuses.filter((s: any) =>
                (data['returnedStatus'] === s['name'])
            );
            setStatus(filteredStatus[0]['id']);

            const filteredPaymentStatus = data2.yearbookPaymentStatuses.filter((p: any) => (data['paymentStatus'] === p['name']));

            setPaymentStatus(filteredPaymentStatus[0]['id']);

            setID(data['id']);
            setPaymentAmount(data['paymentAmount']);
            setORNumber(data['ORnumber']);
            setDateReturned(data['dateReturned']);
            setSoliNumber(data['soliNumber']);
        }
    }, [data, data2]);

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "status":
                setStatus(target.value);
                break;
            case "dateReturned":
                setDateReturned(target.value);
                break;
            case "payment":
                setPaymentAmount(target.value);
                break;
            case "ornumber":
                setORNumber(target.value);
                break;
            case "paymentStatus":
                setPaymentStatus(target.value);
                break;
        }
    };

    const onClickSave = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            id,
            soliNumber,
            status,
            dateReturned,
            paymentAmount,
            paymentStatus,
            ornumber,
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation/solicitation-update`, {
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

    const onToggleChange = async (data: any) => {
        setDisable(!data);
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
            data={data}
        >
            {soli && (
                <section
                    className="flex flex-col gap-2"
                >
                    <h3 className="font-bold">{soli['fullName']}<br />SOLI FORM # {soli['soliNumber']}</h3>
                    <Dropdown
                        label="STATUS"
                        name="status"
                        value={status}
                        datas={statuses}
                        disabled={disable}
                        onChange={onChange}
                    />
                    <Input
                        title="DATE RETURNED"
                        id="dateReturned"
                        value={dateReturned}
                        disabled={disable}
                        type="date"
                        onChange={onChange}
                    />
                    <Input
                        title="PAYMENT"
                        id="payment"
                        value={paymentAmount}
                        disabled={disable}
                        onChange={onChange}
                    />
                    <Input
                        title="OR NUMBER"
                        id="ornumber"
                        value={ornumber}
                        disabled={disable}
                        onChange={onChange}
                    />
                    <Dropdown
                        label="PAYMENT STATUS"
                        name="paymentStatus"
                        value={paymentStatus}
                        disabled={disable}
                        datas={paymentStatuses}
                        onChange={onChange}
                    />
                    <Toggle
                        name="Edit"
                        onChange={onToggleChange}
                    >
                        {!confirmSave && (
                            <Button
                                onClick={(e: any) => { setConfirmSave(true); }}
                            >
                                Save
                                <FaSave />
                            </Button>
                        )}
                        {confirmSave && (
                            <Confirm
                                onConfirm={onClickSave}
                                onCancel={(e: any) => setConfirmSave(false)}
                            />
                        )}
                    </Toggle>
                </section>
            )}
        </Modal>
    );
}