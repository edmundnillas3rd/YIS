export default function ({ children, onClick, ...otherProps }: any) {
    return (
        <button
            className="w-full font-bold p-2 text-slate-200 bg-red-600 rounded"
            onClick={onClick}
            {...otherProps}
        >
            {children}
        </button>
    );
}