import { useEffect, useState } from "react";
import { Modal } from "../Globals";

export default function ({
    isOpen,
    hasCloseBtn,
    onClose,
}: ModalProps) {

    const [preview, setPreview] = useState<string>();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-preview`, {
                credentials: "include"
            });

            const data = await response.json();

            if (data?.dataPreview) {
                setPreview(data?.dataPreview);
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
                {preview}
            </section>
        </Modal>
    );
}