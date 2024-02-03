import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Dropdown, Input, Modal } from "../Globals";

export default function ({ isOpen, hasCloseBtn, onClose, data, data2 }: ModalProps) {

    const [solicitation, setSolicitationForm] = useState<Object>({
        course: data2[0]['id'],
        name: "",
        soliNum: "",
        careOf: "",
        careOfRelation: "",
        returnedSolis: "",
        unreturnedSolis: "",
        lostOr: "",
        dateReturned: "",
        yearbookPayment: "",
        orNum: "",
        fullPayment: "",
        paymentStatus: data.paymentStatuses[0]['id'],
        soliStatus: data.statuses[0]['id']
    });

    useEffect(() => {
    }, []);

    useEffect(() => {
        console.log(solicitation);

    }, [solicitation, data]);


    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            const respone = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation/add-solicitation`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(solicitation)
            })

        } catch (error) {
            console.error(error);
        }
    }

    const onChange = (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;

        setSolicitationForm((state: any) => ({
            ...state,
            [target.name]: target.value
        }));

    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <form method="POST" className="flex flex-col gap-2" onSubmit={onSubmit}>
                <section className="flex flex-row justify-between mt-5">
                    <h3 className="font-bold mb-5">ADD NEW SOLICITATION FORM</h3>
                    <Button type="submit">Add</Button>
                </section>
                <Dropdown
                    label="COURSE"
                    name="course"
                    datas={data2}
                    required={true}
                />
                <Input
                    title="NAME"
                    id="name"
                    onChange={onChange}
                    required={true}
                />
                <Input
                    title="SOL #'S"
                    id="soliNum"
                    onChange={onChange}
                    required={true}
                />
                <Input
                    title="CARE OF"
                    id="careOf"
                    onChange={onChange}
                />
                <Input
                    title="CARE OF RELATION"
                    id="careOfRelation"
                    onChange={onChange}
                />
                <Input
                    title="RETURNED SOLIS"
                    id="returnedSolis"
                    onChange={onChange}
                />
                <Input
                    title="UNRETURNED/LOST SOLIS"
                    id="unreturnedSolis"
                    onChange={onChange}
                />
                <Input
                    title="LOST OR #"
                    id="lostOr"
                    onChange={onChange}
                />
                <Input
                    title="DATE RETURNED"
                    id="dateReturned"
                    onChange={onChange}
                    type="date"
                />
                <Input
                    title="YEARBOOK PAYMENT"
                    id="yearbookPayment"
                    onChange={onChange}
                />
                <Input
                    title="OR #"
                    id="orNum"
                    onChange={onChange}
                />
                <Input
                    title="FULL PAYMENT"
                    id="fullPayment"
                    onChange={onChange}
                />
                <Dropdown
                    label="CURRENT PAYMENT STATUS"
                    name="paymentStatus"
                    onChange={onChange}
                    datas={data.paymentStatuses}
                />
                <Dropdown
                    label="CURRENT SOLI STATUS"
                    name="soliStatus"
                    onChange={onChange}
                    datas={data.statuses}
                />
            </form>
        </Modal>
    );
}