export default function ({ label, name, datas, ...otherProps }: any) {
    return (
        <section className="flex flex-col font-bold text-gray-900">
            <label htmlFor={name}>{label}</label>
            <select
                className="block rounded-md border-0 py-1.5 pr-10 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6"
                name={name}
                id={name}
                {...otherProps}
            >
                {datas && datas.map((data: any, idx: number) => {
                    // if (data === defaultValue)
                    //     return <option selected value={data}>{data}</option>;
                    if (data?.id && data?.name) {
                        return <option key={idx} value={data.id}>{data.name}</option>;
                    }

                    return <option key={idx} value={data}>{data}</option>;
                })}
            </select>
        </section>
    );
}