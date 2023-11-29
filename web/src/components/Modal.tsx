import { useEffect, useRef, useState } from "react";
import { Button } from "./Globals/index";

export default function ({ isOpen, hasCloseBtn, onClose, children }: ModalProps) {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [isModalOpen, setModalOpen] = useState(isOpen);

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }

        setModalOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    return (
        <dialog className="p-5 md:w-8/12 rounded" ref={modalRef} onKeyDown={handleKeyDown} >
            {hasCloseBtn && (
                <section className="flex flex-auto flex-row justify-end">
                    <Button onClick={handleCloseModal}>
                        Close
                    </Button>
                </section>
            )}
            {children}
        </dialog>
    );
}