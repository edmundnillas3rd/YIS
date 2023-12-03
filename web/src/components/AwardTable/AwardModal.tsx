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

    const [awardAttendedName, setAwardAttended] = useState<string>();
    const [awardName, setAwardName] = useState<string>();
    const [awardReceived, setAwardReceived] = useState<string>();
    const [errMessage, setErrMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [years, setYears] = useState<number[]>();
    const navigate = useNavigate();

    useEffect(() => {
        setYears(generateYearRange());
    }, []);

    useEffect(() => {
        if (years)
            setAwardReceived(years[0].toString());
    }, [years]);

    useEffect(() => {
        

    }, [awardAttendedName, awardName, awardReceived]);

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
        setLoading(true);
        

        if (awardAttendedName && awardName && awardReceived) {
            const data = {
                awardAttendedName,
                awardName,
                awardReceived
            };

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
                    title="Award Attended Name"
                    id="award-attended"
                    onChange={onChange}
                />
                <Input
                    title="Award Attended Name"
                    id="award-name"
                    onChange={onChange}
                />
                <Dropdown
                    label="Award Received"
                    name="award-received"
                    onChange={onChange}
                    datas={years}
                />
                <section className="flex flex-row justify-end items-center gap-5">
                    {errMessage && <p className="font-bold text-red-600">{errMessage}</p>}
                    <Button type="submit" disabled={loading}>
                        {loading ? <Spinner/> : "Submit"}
                    </Button>
                </section>
            </form>

        </Modal>
    );
}