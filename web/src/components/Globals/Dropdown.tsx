export default function ({ label, name, defaultValue, datas, ...otherProps }: any) {
    return (
        <section className="flex flex-col">
            <label htmlFor={name}>{label}</label>
            <select
                className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name={name}
                id={name}
                defaultValue={defaultValue}
                {...otherProps}
            >
                {datas && datas.map((data: any) => (<option value={data}>{data}</option>))}
            </select>
        </section>
    );
}