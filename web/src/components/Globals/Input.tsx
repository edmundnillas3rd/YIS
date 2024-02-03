export default function ({
    title,
    id,
    onChange,
    pattern,
    required,
    width = "",
    footnote = "",
    ...otherProps }: any) {
    return (
        <section className={`flex flex-col relative ${width}`}>
            <label
                htmlFor={id}
                className={`block text-sm font-bold leading-6 text-gray-900 ${required ? "after:text-red-400 after:content-['*'] " : ""}`}
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
            <section className="flex flex-row justify-center absolute mt-16">
                <span className="text-zinc-500 text-xs font-bold">{footnote}</span>
            </section>
        </section>
    );
}