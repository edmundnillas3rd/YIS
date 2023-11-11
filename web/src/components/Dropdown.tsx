import { FaAngleDown } from "react-icons/fa";

interface DropdownProps {
    label: string;
    items: Label[];
}

export default function Dropdown({ label, items }: DropdownProps) {
    return <section className="flex flex-col p-5 md:p-0 md:w-5/12">
        <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>

        <select className="w-full h-8 cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
            {items.length !== 0 && (
                items.map((item, i) =>
                    <option key={i} className="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option" value={item.id}>
                        {item.name}
                    </option>
                )
            )}
        </select>
    </section>;
}