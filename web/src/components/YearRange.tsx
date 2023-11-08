interface YearRangeProps {
    label: string;
}

export default function YearRange({ label }: YearRangeProps) {
    return <section className="flex flex-col p-5 md:p-0 md:w-5/12">
        <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>

        <section className="flex flex-row gap-4">
            {/* From */}
            <select className="w-full h-8 cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <option className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2019</option>
                <option className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2020</option>
                <option className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2021</option>
                <option className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2023</option>
            </select>

            <p className="font-bold text-sm text-slate-600 flex items-center">TO</p>

            {/* To */}
            <select className="w-full h-8 cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <option className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2019</option>
                <option className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2020</option>
                <option className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2021</option>
                <option className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2023</option>
            </select>
        </section>
    </section>;
}