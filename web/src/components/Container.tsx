export default function ({ children, ...otherProps }: any) {
    return (
        <section className={`
            flex
            flex-col
            gap-1
            p-5
            mx-5
            rounded-md
            border
            border-slate-400
        `}
            {...otherProps}
        >
            {children}
        </section>
    );
}