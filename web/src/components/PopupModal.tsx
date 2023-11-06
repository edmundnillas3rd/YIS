interface PopupModalProps {
    children: JSX.Element | JSX.Element[];
}

export default function PopupModal({ children }: PopupModalProps) {
    return (
        <section className="absolute flex flex-col">
            {children}
        </section>
    );
}