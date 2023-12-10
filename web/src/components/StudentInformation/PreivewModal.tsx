import { useEffect, useState } from "react";
import { Modal } from "../Globals";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
}: ModalProps) {

    const [affiliations, setAffiliations] = useState([]);
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-preview`, {
                credentials: "include"
            });

            const data = await response.json();

            if (data) {
                setAffiliations(data.affiliations);
                setAwards(data.awards);
            }
        })();
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            hasCloseBtn={hasCloseBtn}
            onClose={onClose}
        >
            <section className="flex flex-col gap-5">
                <h3 className="font-bold">Preview</h3>
                <ul>
                    <h3 className="font-bold">Affiliation(s)</h3>
                    {affiliations.length && (
                        affiliations.map(affil => (
                            <li>{affil}</li>
                        ))
                    )}
                </ul>
                <ul>
                    <h3 className="font-bold">Awards(s)</h3>
                    {awards.length && (
                        awards.map(award => (
                            <li>{award}</li>
                        ))
                    )}
                </ul>
            </section>
        </Modal>
    );
}