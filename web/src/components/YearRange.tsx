interface YearRangeProps {
    label: string;
}

import { generateYearRange as years } from "../API/generateYearRange";

export default function YearRange({ label }: YearRangeProps) {

    const defaultStartingYear = 2016;

    return <section className="flex flex-col p-5 md:p-0 md:w-full">
        <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>

        <section className="flex flex-row gap-4">
            {/* From */}
            <select className="w-full h-8 cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                {years(defaultStartingYear).map((year, i) => <option key={i} className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">{year}</option>)}
            </select>

            <p className="font-bold text-sm text-slate-600 flex items-center">TO</p>

            {/* To */}
            <select className="w-full h-8 cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                {years(defaultStartingYear + 4).map((year, i) => <option key={i} className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">{year}</option>)}
            </select>
        </section>
    </section>;
}