interface ContainerProps {
    children?: JSX.Element | JSX.Element[];
}

export default function Container({ children }: ContainerProps) {
    return (
        <section className="py-5 px-2 flex flex-col w-full border border-zinc-400 rounded">
            {children}
        </section>
    );
}