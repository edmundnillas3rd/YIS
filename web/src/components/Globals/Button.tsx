export default function ({ children, onClick, maxWidth, ...otherProps }: any) {

    return (
        <button
            className={`${maxWidth ? "w-full p-2" : "p-2" } flex flex-row justify-center items-center gap-1 font-bold text-slate-200 bg-red-600 rounded active:bg-red-400`}
            onClick={onClick}
            {...otherProps}
        >
            {children}
        </button>
    );
}