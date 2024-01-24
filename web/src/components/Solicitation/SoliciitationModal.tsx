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
    const [firstName, setFirstName] = useState<string>();
    const [familyName, setFamilyName] = useState<string>();
    const [middleName, setMiddleName] = useState<string>();
    const [suffix, setSuffix] = useState<string>();
    const [status, setStatus] = useState<string>();
    const [careOf, setCareOf] = useState<string>();
    const [relation, setRelation] = useState<string>();
    const [returnedSolis, setReturnedSolis] = useState<string>();
    const [unreturnedSolis, setUnreturnedSolis] = useState<string>();
    const [dateReturned, setDateReturned] = useState<string>();
    const [paymentStatus, setPaymentStatus] = useState<string>();
    const [paymentAmount, setPaymentAmount] = useState<string>();
    const [ornumber, setORNumber] = useState<string>();
    const [lostOrNumber, setLostORNumber] = useState<string>();
    const [soliNumber, setSoliNumber] = useState<string>();

    const [disable, setDisable] = useState<boolean>(false);
    const [confirmSave, setConfirmSave] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data2) {

            setSoli(data);
            setStatuses(data2.statuses);
            setPaymentStatuses(data2.yearbookPaymentStatuses);

            const filteredStatus = data2.statuses.filter((s: any) =>
                (data['returnedStatus'] === s['name'])
            );

            setStatus(filteredStatus[0]['id']);

            const filteredPaymentStatus = data2.yearbookPaymentStatuses.filter((p: any) => (data['paymentStatus'] === p['name']));

            if (filteredPaymentStatus[0]['id']) {
                setPaymentStatus(filteredPaymentStatus[0]['id']);
            } else {
                setPaymentStatus("N/A");
            }


            setID(data['id']);
            setFirstName(data['firstName']);
            setFamilyName(data['lastName']);
            setMiddleName(data['middleName']);
            setSuffix(data['suffix']);
            setCareOf(data['careOfFullName']);
            setRelation(data['careOfRelation']);
            setPaymentAmount(data['paymentAmount']);
            setLostORNumber(data['lostORNumber']);
            setORNumber(data['ORnumber']);
            setDateReturned(data['dateReturned']);
            setSoliNumber(data['soliNumber']);
            setReturnedSolis(data['returnedSolis']);
            setUnreturnedSolis(data['unreturnedSolis']);
        }
    }, [data, data2]);

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "status":
                setStatus(target.value);
                break;
            case "firstName":
                setFirstName(target.value);
                break;
            case "familyName":
                setFamilyName(target.value);
                break;
            case "middleName":
                setMiddleName(target.value);
                break;
            case "dateReturned":
                setDateReturned(target.value);
                break;
            case "soliNums":
                setSoliNumber(target.value);
                break;
            case "careof":
                setCareOf(target.value);
                break;
            case "relation":
                setRelation(target.value);
                break;
            case "payment":
                setPaymentAmount(target.value);
                break;
            case "ornumber":
                setORNumber(target.value);
                break;
            case "lostORNumber":
                setLostORNumber(target.value);
                break;
            case "paymentStatus":
                setPaymentStatus(target.value);
                break;
            case "returnedSolis":
                setReturnedSolis(target.value);
                break;
            case "unreturnedSolis":
                setUnreturnedSolis(target.value);
                break;
        }
    };

    const onClickSave = async (event: SyntheticEvent) => {
        event.preventDefault();

        const data = {
            id,
            firstName,
            middleName,
            familyName,
            suffix,
            careOf,
            relation,
            soliNumber,
            status,
            dateReturned,
            returnedSolis,
            unreturnedSolis,
            paymentAmount,
            paymentStatus,
            ornumber,
            lostOrNumber
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
                    className="flex flex-col gap-2 mt-5"
                >
                    <div className="flex flex-row justify-between items-center gap-1">

                        <h3 className="font-bold">
                            Soli #'s {soli['soliNumber']}
                        </h3>
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
                    </div>
                    <section className="flex flex-row gap-1">
                        <Input
                            title="FIRST NAME"
                            id="firstName"
                            value={firstName}
                            disabled={disable}
                            onChange={onChange}
                        />
                        <Input
                            title="FAMILY NAME"
                            id="familyName"
                            value={familyName}
                            disabled={disable}
                            onChange={onChange}
                        />
                        <Input
                            title="MIDDLE NAME"
                            id="middleName"
                            value={middleName}
                            disabled={disable}
                            onChange={onChange}
                        />
                        <Input
                            title="SUFFIX"
                            id="suffix"
                            value={suffix}
                            disabled={disable}
                            onChange={onChange}
                        />
                    </section>
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
                        title="SOLI #'s"
                        id="soliNums"
                        value={soliNumber}
                        disabled={disable}
                        onChange={onChange}
                    />
                    <Input
                        title="Care Of"
                        id="careof"
                        value={careOf}
                        disabled={disable}
                        onChange={onChange}
                    />
                    <Input
                        title="Care Of Relation"
                        id="relation"
                        value={relation}
                        disabled={disable}
                        onChange={onChange}
                    />
                    <Input
                        title="RETURNED SOLIS"
                        id="returnedSolis"
                        value={returnedSolis}
                        disabled={disable}
                        onChange={onChange}
                    />
                    <Input
                        title="UNRETURNED SOLIS"
                        id="unreturnedSolis"
                        value={unreturnedSolis}
                        disabled={disable}
                        onChange={onChange}
                    />
                    <Input
                        title="FULL PAYMENT"
                        id="payment"
                        value={paymentAmount}
                        disabled={disable}
                        onChange={onChange}
                    />
                    <Input
                        title="LOST OR NUMBER"
                        id="lostORnumber"
                        value={lostOrNumber}
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

                </section>
            )}
        </Modal>
    );
}