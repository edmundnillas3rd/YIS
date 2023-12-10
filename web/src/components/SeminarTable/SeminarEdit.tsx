import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Confirm, Dropdown, Input, Modal, Spinner, Toggle } from "../Globals";
import { generateYearRange } from "../../utilities/generateYearRange";
import { FaSave } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
    data
}: ModalProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(true);
    const [confirmSave, setConfirmSave] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    const [id, setID] = useState<string>("");
    const [seminarName, setSeminarName] = useState<string>("");
    const [seminarParticipationName, setSeminarParticipationName] = useState<string>("");
    const [seminarDate, setSeminarDate] = useState<string>("");
    const years = generateYearRange();

    useEffect(() => {
        if (data) {
            setID(data['id']);
            setSeminarParticipationName(data['seminarAttendedName']);
            setSeminarName(data['seminarName']);
            setSeminarDate(data['seminarDateAttended']);
            console.log(seminarName);
            
        }
    }, [data]);

    const onChangeHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "seminar-name":
                setSeminarName(target.value);
                break;
            case "role":
                setSeminarParticipationName(target.value);
                break;
            case "seminar-date":
                setSeminarDate(target.value);
                break;
        }
    }

    const onEditChange = (state: any) => {
        setDisable(!state);
        setConfirmSave(false);
        setConfirmDelete(false);
    }

    const onClickSave = async (event: SyntheticEvent) => {
        event.preventDefault();
    }

    const onClickDelete = async (event: SyntheticEvent) => {
        event.preventDefault();
    }

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <section className="flex flex-col gap-2">
                <Input
                    title="Seminar Name"
                    id="seminar-name"
                    value={seminarName}
                    onChange={onChangeHandler}
                    disabled={disable}
                />
                <Input
                    title="Role"
                    id="role"
                    value={seminarParticipationName}
                    onChange={onChangeHandler}
                    disabled={disable}
                />
                <Dropdown
                    label="Seminar Date"
                    name="seminar-date"
                    value={seminarDate}
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
                )}
            </section>
        </Modal>
    )
}