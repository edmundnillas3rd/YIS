import { SyntheticEvent, useState } from "react";
import { Button, Dropdown, Input, Modal } from "../Globals";

export default function ({ isOpen, hasCloseBtn, onClose, data, data2 }: ModalProps) {

    const [yearbookPhoto, setYearbookPhoto] = useState<Object>({
        fullName: "",
        fullPayment: "",
        paymentStatus: data[0]['id'],
        yearbookStatus: data2[0]['id'],
        date: "",
    });

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;

        setYearbookPhoto((state: any) => ({
            ...state,
            [target.name]: target.value
        }));
    };

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/add-yearbook-photo`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(yearbookPhoto)
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <form action="" onSubmit={onSubmit}>
                <section className="flex flex-row justify-between mt-5">
                    <h3 className="font-bold mb-5">ADD NEW YEARBOOK PHOTO</h3>
                    <Button type="submit">Add</Button>
                </section>
                {/* <Dropdown
                    label="S.Y."
                    name="schoolYear"
                    datas={years}
                /> */}
                <Input
                    title="FULL NAME"
                    id="fullName"
                    onChange={onChange}
                    required={true}
                />
                <Input
                    title="FULL PAYMENT"
                    id="fullPayment"
                    onChange={onChange}
                    required={true}
                />
                <Dropdown
                    label="PAYMENT STATUS"
                    name="paymentStatus"
                    onChange={onChange}
                    datas={data2}
                />
                <Dropdown
                    label="YEARBOOK STATUS"
                    name="yearbookStatus"
                    onChange={onChange}
                    datas={data}
                />
                <Input
                    title="DATE RELEASED"
                    namee="dateReleased"
                    type="date"
                    onChange={onChange}
                />
            </form>
        </Modal>
    );
}