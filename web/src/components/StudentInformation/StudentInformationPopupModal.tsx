import { SyntheticEvent, useEffect, useState } from "react";
import { AiFillEdit, AiFillSave, AiOutlinePlus } from "react-icons/ai";
import PositionForm from "./PositionForm";

export default function StudentInformationPopupModal({ data, onClickCallback }: PopupModalProps) {
    const [clubAttr, setClubAttr] = useState<ClubAttr>();
    const [positionForms, setPositionForms] = useState<React.ReactNode[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>("");
    const [clubPositions, setClubPositions] = useState<any[]>();

    useEffect(() => {

        (async () => {
            const clubAttrResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs`, {
                credentials: "include"
            });
            const clubAttrData = await clubAttrResponse.json();

            const userClubPositionResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/${data.id}/user-club-info`, {
                credentials: "include"
            });

            const userClubPositionData = await userClubPositionResponse.json();

            const [clubAttributes, clubInfo] = await Promise.all([clubAttrData, userClubPositionData]);

            const organizations = clubAttributes.organizations.map(({ club_organization_id, club_organization_name }: Organization) => ({ id: club_organization_id, name: club_organization_name }));
            const positions = clubAttributes.positions.map(({ club_position_id, club_position_name }: Position) => ({ id: club_position_id, name: club_position_name }));
            setClubAttr({
                organizations,
                positions
            });

            setSubmitted(true);
            setErrMessage("");

            setClubPositions(clubInfo.userClubPositions);
            setPositionForms(clubInfo.userClubPositions.map((position: any, i: number) => <PositionForm key={i} info={position} club={data} positions={positions} onSubmitCallbackFn={onSubmitHandler} />));
        })();
    }, []);

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        setSubmitted(true);
    };

    const onClickAddPosition = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (!submitted && positionForms.length > 0) {
            setErrMessage("Fill in the details first before adding new");
            return;
        }

        // const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/position-add`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     credentials: "include",
        //     body: JSON.stringify(data)
        // });

        // const { club } = await response.json();

        if (clubPositions && clubPositions.length !== 2) {
            setClubPositions((state) => [
                ...state as [],
                {
                    clubPositionName: "Member",
                    clubStarted: 2001,
                    clubEnded: 2002,
                    newPosition: true
                }
            ]);
            setSubmitted(false);
        }

        // const key = positionForms.length + 100;
        // if (clubAttr && positionForms.length !== 2) {
        //     setPositionForms((state) => ([
        //         ...state,
        //         <PositionForm key={key} club={data} positions={clubAttr.positions} onSubmitCallbackFn={onSubmitHandler} />
        //     ]));
        //     setSubmitted(false);
        // }
    };

    return (
        <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
            <section className="bg-white border border-zinc-400 rounded flex flex-col w-11/12 md:w-1/2 p-10 gap-2 ">
                <section className="flex flex-row items-center justify-between gap-5">
                    <section className="flex flex-col justify-center">
                        <h3 className="font-bold">Club Organization Information</h3>
                        <h3 className="font-bold mt-5 text-gray-500">{data.organization}</h3>
                    </section>
                    <section className="font-bold p-2 flex flex-row cursor-pointer hover:bg-zinc-300 hover:rounded" onClick={onClickCallback}>X</section>
                </section>
                <section className="flex flex-col h-96 overflow-y-scroll">

                    {clubPositions && clubAttr &&
                        clubPositions.map((pf, i) => (
                            <>
                                <p className="font-bold mt-5 " key={i + 500} >Position #{i + 1}</p>
                                <PositionForm info={pf} key={i} club={data.id} positions={clubAttr.positions} onSubmitCallbackFn={onSubmitHandler} />
                            </>
                        ))
                    }
                </section>
                <section className="flex flex-row pt-5 gap-2 justify-end items-center">
                    {errMessage && <p className="text-red-400 font-bold text-xs">{errMessage}</p>}
                    <button className="flex flex-row justify-center items-center gap-3 font-bold text-slate-100 bg-red-600  p-1 rounded"
                        onClick={onClickCallback}>
                        <p>Cancel</p>
                    </button>
                    <button className="flex flex-row flex-shrink-0 justify-center items-center gap-3 font-bold text-slate-100 bg-red-600  p-1 rounded"
                        onClick={onClickAddPosition}>
                        <p>Add Positions</p>
                        <AiOutlinePlus />
                    </button>
                </section>
            </section>

        </section>
    );
}