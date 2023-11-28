import { SyntheticEvent, useEffect, useState } from "react";
import Modal from "../Modal";
import Input from "../Globals/Input";
import Button from "../Globals/Button";
import { useNavigate } from "react-router-dom";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
}: ModalProps) {

    const [awardAttended, setAwardAttended] = useState<string>();
    const [awardName, setAwardName] = useState<string>();
    const [awardRecieved, setAwardReceived] = useState<string>();
    const navigate = useNavigate();

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "award-attended":
                setAwardAttended(target.value);
                break;
            case "award-name":
                setAwardName(target.value);
                break;
            case "award-received":
                setAwardReceived(target.value);
                break;
        }
    };

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        console.log(awardAttended, awardName, awardRecieved);

        const data = {
            awardAttended,
            awardName,
            awardRecieved
        }
        
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/award-add`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log("Adding new Award success!");
            navigate(0);
        }
            
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <form
                onSubmit={onSubmitHandler}
                method="POST"
                className="flex flex-col gap-5">
                <Input
                    title="Award Attended Name"
                    id="award-attended"
                    onChange={onChange}
                />
                <Input
                    title="Award Attended Name"
                    id="award-name"
                    onChange={onChange}
                />
                <Input
                    title="Award Attended Name"
                    id="award-received"
                    onChange={onChange}
                    type="date"
                />
                <Button type="submit">Submit</Button>
            </form>

        </Modal>
    );
}