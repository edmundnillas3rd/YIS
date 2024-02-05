import { forwardRef } from "react";

const Dropdown = forwardRef(function ({ label, name, datas, value, required, ...otherProps }: any, ref) {
    return (
        <section className="flex flex-col text-sm font-bold text-gray-900">
            <label className={`${required ? "after:text-red-400 after:content-['*'] " : ""}`} htmlFor={name}>{label}</label>
            <select
                className={`block rounded-md border-0 py-1.5 pr-10 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6 `}
                name={name}
                id={name}
                value={value}
                required={required}
                {...otherProps}
                ref={ref}
            >
                {datas && datas.map((data: any, idx: number) => {
                    // if (data === defaultValue) {
                    //     return <option selected={true} value={data}>{data}</option>;
                    // }
                    
                    if (data?.id && data?.name) {
                        return <option key={idx} value={data.id}>{data.name}</option>;
                    }

                    return <option key={idx} value={data}>{data}</option>;
                })}
            </select>
        </section>
    );
})

export default Dropdown;