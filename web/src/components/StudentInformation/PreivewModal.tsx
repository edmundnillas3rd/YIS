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

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-preview`, {
                credentials: "include"
            });

            const data = await response.json();

            if (data) {
                setAffiliations(data.affiliations.map((affil: any) => ({ key: uuid(), value: affil })));
                setAwards(data.awards.map((award: any) => ({ key: uuid(), value: award })));
            }
        })();
    }, []);

    useEffect(() => {

        if (affiliations && awards) {
            console.log(affiliations, awards);

        }
    }, [affiliations, awards])

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <section className="flex flex-col gap-5">
                <h3 className="font-bold">Preview</h3>
                {affiliations && awards && (
                    <>
                        <ul>
                            <h3 className="font-bold">Affiliation(s)</h3>
                            {affiliations.length && (
                                affiliations.map(affil => (
                                    <li key={affil?.key}>{affil?.value}</li>
                                ))
                            )}
                        </ul>
                        <ul>
                            <h3 className="font-bold">Awards(s)</h3>
                            {awards.length && (
                                awards.map(award => (
                                    <li key={award?.key}>{award?.value}</li>
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