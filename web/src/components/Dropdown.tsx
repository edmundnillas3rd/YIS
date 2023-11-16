import { SyntheticEvent, useEffect, useState } from "react";

interface DropdownProps {
    defaultValue?: string;
    label: string;
    items: any[];
    callbackDropdownFn?: (data: any) => void;
    disabled?: boolean;
}

export default function Dropdown({ defaultValue, label, items, callbackDropdownFn, disabled }: DropdownProps) {

    const [selections, setSelections] = useState<any[]>([]);
    const onChangeHandler = (event: SyntheticEvent) => {
        const selectedItem = event.target as HTMLInputElement;
        if (callbackDropdownFn) {
            callbackDropdownFn(selectedItem.value);
        }
    };

    useEffect(() => {

        if (!items[0].hasOwnProperty('id')) {
            setSelections(items.map((item, idx) => {
                return {
                    id: `${idx}`,
                    name: `${item}`
                };
            }));
        } else {
            setSelections(items)
        }

        if (callbackDropdownFn) {
            callbackDropdownFn(items[0]);
        }
    }, []);

    return <section className="flex flex-col p-5 md:p-0 w-full">
        <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <select className="w-full h-8 cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            onClick={onChangeHandler}
            disabled={disabled}
        >
            {selections.length !== 0 && (
                selections.map((item, i) => {

                    if (item.name === defaultValue) return (
                        <option defaultValue={selections[0]} key={i} className="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option" value={item.id}>
                            {item.name}
                        </option>

                    );

                    return <option key={i} className="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option" value={item.id}>
                        {item.name}
                    </option>;

                }
                )
            )}
        </select>
    </section>;
}