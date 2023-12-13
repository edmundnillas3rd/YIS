import { useEffect, useState } from "react";
import { Modal } from "../Globals";
import { v4 as uuid } from "uuid";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
}: ModalProps) {

    const [affiliations, setAffiliations] = useState<any[]>([]);
    const [awards, setAwards] = useState<any[]>([]);
    const [seminars, setSeminars] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-preview`, {
                credentials: "include"
            });

            const data = await response.json();

            if (data) {
                setAffiliations(data.affiliations.map((affil: any) => ({ key: uuid(), value: affil })));
                setAwards(data.awards.map((award: any) => ({ key: uuid(), value: award })));
                setSeminars(data.seminars.map((seminar: any) => ({ key: uuid(), value: seminar })));
            }
        })();
    }, []);

    useEffect(() => {

        if (affiliations && awards && seminars) {
            console.log(affiliations, awards && seminars);

        }
    }, [affiliations, awards, seminars]);

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <section className="flex flex-col gap-5 p-5">
                <h3 className="font-bold">Preview</h3>
                {affiliations && awards && seminars && (
                    <>
                        <ul>
                            <h3 className="font-bold">Affiliation(s)</h3>
                            {affiliations && (
                                affiliations.map(affil => (
                                    <li className="list-disc" key={affil?.key}>{affil?.value}</li>
                                ))
                            )}
                        </ul>
                        <ul>
                            <h3 className="font-bold">Awards(s)</h3>
                            {awards && (
                                awards.map(award => (
                                    <li className="list-disc" key={award?.key}>{award?.value}</li>
                                ))
                            )}
                        </ul>
                        <ul>
                            <h3 className="font-bold">Seminars(s)</h3>
                            {seminars && (
                                seminars.map(semi => (
                                    <li className="list-disc" key={semi?.key}>{semi?.value}</li>
                                ))
                            )}
                        </ul>
                    </>
                )
                }
            </section>
        </Modal>
    );
}