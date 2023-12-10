import { SyntheticEvent, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
    Button,
    Dropdown,
    Input,
    Spinner,
    Modal,
    Toggle,
    Confirm
} from "../Globals";
import { generateYearRange } from "../../utilities/generateYearRange";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
    data
}: ModalProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(true);
    const [years, setYears] = useState<number[]>();
    
    // For the updating forms
    const [id, setID] = useState<string>("");
    const [awardAttendedName, setAwardAttendedName] = useState<string>("");
    const [awardName, setAwardName] = useState<string>("");
    const [awardReceived, setAwardReceived] = useState<string>("");

    const [confirmSave, setConfirmSave] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        setYears(generateYearRange());
    }, []);

    useEffect(() => {
        if (data) {
            setID(data['id']);
            setAwardAttendedName(data['awardAttendedName']);
            setAwardName(data['awardName']);
            setAwardReceived(data['awardReceived']);
        }
    }, [data]);

    const onClickSave = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);
        setDisable(true);
        if (awardAttendedName && awardName && awardReceived) {
            const award = {
                awardAttendedName,
                awardName,
                awardReceived
            };

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/${id}/award-update`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(award)
            });

            if (response.ok) {
                setLoading(false);
                console.log("Successfully updated award entry");
                navigate(0);
            }
        }
    };

    const onChangeHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "award-attended":
                setAwardAttendedName(target.value);
                break;
            case "award-name":
                setAwardName(target.value);
                break;
            case "award-received":
                setAwardReceived(target.value);
                break;
        }
    };

    const onClickDelete = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);
        setDisable(true);


        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/${id}/user-award-remove`, {
            method: "DELETE",
            credentials: "include"
        });

        if (response.ok) {
            setLoading(false);
            console.log("Successfully deleted award entry");
            navigate(0);
        }
    };

    const onEditChange = (state: any) => {
        setDisable(!state);
        setConfirmDelete(false);
        setConfirmSave(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <section className="flex flex-col gap-2">
                <Input
                    title="Award & Seminar"
                    id="award-attended"
                    value={awardAttendedName}
                    onChange={onChangeHandler}
                    disabled={disable}
                />
                <Input
                    title="Award/ETC"
                    id="award-name"
                    value={awardName}
                    onChange={onChangeHandler}
                    disabled={disable}
                />
                {/* <Input
                        title="Award Received"
                        id="award-received"
                        value={award['awardReceived']}
                        onChange={onChangeHandler}
                        disabled={disable}
                    /> */}
                <Dropdown
                    label="Award Received"
                    name="award-received"
                    value={awardReceived}
                    disabled={disable}
                    datas={years}
                    onChange={onChangeHandler}
                />
                {!loading ? (
                    <Toggle name="Edit" icon={<MdEdit />} onChange={onEditChange}>
                        {(!confirmSave && !confirmDelete) && (
                            <>
                                <Button onClick={(e: any) => { setConfirmDelete(true); }}>
                                    Delete
                                    <MdDelete />
                                </Button>
                                <Button onClick={(e: any) => { setConfirmSave(true); }}>
                                    Save
                                    <FaSave />
                                </Button>
                            </>
                        )}
                        {confirmSave && (
                            <Confirm
                                onConfirm={onClickSave}
                                onCancel={(e: any) => setConfirmSave(false)}
                            />
                        )}
                        {confirmDelete && (
                            <Confirm
                                onConfirm={onClickDelete}
                                onCancel={(e: any) => setConfirmDelete(false)}
                            />
                        )}
                    </Toggle>
                ) : (
                    <Button disabled={true}>
                        <Spinner />
                    </Button>
                )
                }

            </section>
        </Modal>
    );
}