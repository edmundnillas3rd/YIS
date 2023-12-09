import { SyntheticEvent, useEffect, useState } from "react";
import { Input, Button } from "../Globals/index";
import { useNavigate } from "react-router-dom";
import { Dropdown, Spinner, Modal } from "../Globals";
import { generateYearRange } from "../../utilities/generateYearRange";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
}: ModalProps) {

    const [seminarParticipationName, setSeminarParticipationName] = useState<string>("");
    const [seminarDate, setSeminarDate] = useState<string>("");
    const [seminarName, setSeminarName] = useState<string>("");
    const [errMessage, setErrMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [years, setYears] = useState<number[]>();
    const navigate = useNavigate();

    useEffect(() => {
        setYears(generateYearRange());
    }, []);

    useEffect(() => {
        if (years)
            setSeminarDate(years[0].toString());
    }, [years]);

    const onChange = async (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;

        switch (target.name) {
            case "seminar-participation_name":
                setSeminarParticipationName(target.value);
                break;
            case "seminar-name":
                setSeminarName(target.value);
                break;
            case "seminar-date-attended":
                setSeminarDate(target.value);
                break;
        }
    };

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);


        if (seminarParticipationName && seminarDate && seminarName) {
            const data = {
                seminarParticipationName,
                seminarName,
                seminarDate
            };

            // To add route for adding seminars

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
                setLoading(true);
                navigate(0);
            }
        } else {
            setErrMessage("Fill up all key details");
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
                    title="Seminar Participation"
                    id="seminar-participation_name"
                    onChange={onChange}
                />
                <Input
                    title="Seminar"
                    id="seminar-name"
                    onChange={onChange}
                />
                <Dropdown
                    label="Date Attended"
                    name="seminar-date-attended"
                    onChange={onChange}
                    datas={years}
                />
                <section className="flex flex-row justify-end items-center gap-5">
                    {errMessage && <p className="font-bold text-red-600">{errMessage}</p>}
                    <Button type="submit" disabled={loading}>
                        {loading ? <Spinner /> : "Submit"}
                    </Button>
                </section>
            </form>

        </Modal>
    );
}