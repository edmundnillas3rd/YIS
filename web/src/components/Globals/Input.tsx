export default function ({
    title,
    id,
    onChange,
    pattern,
    required,
    ...otherProps }: any) {
    return (
        <section className="flex flex-auto flex-col">
            <label
                htmlFor={id}
                className={`block text-sm font-bold leading-6 text-gray-900 ${required ? "after:text-lg after:ml-1 after:text-red-400 after:content-['*'] " : " "}`}
            >
                {title}
            </label>
            <input
                id={id}
                name={id}
                className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={onChange}
                pattern={pattern}
                required={required}
                {...otherProps}
            />
        </section>
    );
}