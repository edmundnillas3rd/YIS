interface DisplayProps {
    children?: React.ReactNode;
}

export default function Display({ children }: DisplayProps) {
    return (
        <section className="md:w-full md:px-1 flex flex-col md:flex-row md:gap-10">
            {children}
        </section>
    );
}