import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface YearRangeProps {
    label: string;
}

export default function YearRange({ label }: YearRangeProps) {
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

    return <section className="flex flex-col p-5 md:p-0 md:w-5/12">
        <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>

        <section className="flex flex-row gap-4">
            {/* From */}
            <section className="relative w-full">
                <button
                    type="button"
                    className="relative w-full h-8 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    onClick={e => {
                        e.preventDefault();
                        setShowFrom(s => !s);
                    }}
                >
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <FaAngleDown style={{
                            color: "black"
                        }} />
                    </span>
                </button>
                {showFrom &&
                    <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex={1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                        <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2019</li>
                        <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2020</li>
                        <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2021</li>
                        <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2023</li>
                    </ul>
                }
            </section>

            <p className="font-bold text-sm text-slate-600 flex items-center">TO</p>

            {/* To */}
            <section className="relative w-full">
                <button
                    type="button"
                    className="relative w-full h-8 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    onClick={e => {
                        e.preventDefault();
                        setShowTo(s => !s);
                    }}
                >
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <FaAngleDown style={{
                            color: "black"
                        }} />
                    </span>
                </button>
                {showTo &&
                    <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex={1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                        <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2019</li>
                        <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2020</li>
                        <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2021</li>
                        <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">2023</li>
                    </ul>
                }
            </section>
        </section>
    </section>;
}