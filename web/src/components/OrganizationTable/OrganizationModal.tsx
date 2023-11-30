import { SyntheticEvent, useState } from "react";
import { Input, Button, Dropdown } from "../Globals";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
}: ModalProps) {

    // club, position, yearStarted, yearEnded
    const [club, setClub] = useState<string>();
    const [position, setPosition] = useState<string>();
    const [yearStarted, setYearStarted] = useState<number>();
    const [yearEnded, setYearEnded] = useState<number>();
    const navigate = useNavigate();

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();
    };

    const onSubmitHander = async (event: SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <form
                onSubmit={onSubmitHander}
                method="POST"
                className="flex flex-col gap-5"
            >
                <Dropdown
                    label="Club & Organizations"
                    name="club"
                    onChange={onChange}
                />
                <Dropdown
                    label="Award Attended Name"
                    name="club"
                    onChange={onChange}
                />
            </form>
        </Modal>
    );
}