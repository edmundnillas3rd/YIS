import { SyntheticEvent, useEffect, useState } from "react";

interface DropdownProps {
    defaultValue?: string;
    label: string;
    items: any[];
    callbackDropdownFn?: (data: any) => void;
    disabled?: boolean;
}

const RenderConditionally = ({ options, selected, onChangeCallback, disabled = false }: any) => options.length > 0 ? (
    <select className="w-full h-8 cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        defaultValue={selected}
        onChange={onChangeCallback}
        disabled={disabled}>
        {options.map((item: any) => (
            <option className="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" key={item.id} value={item.name}>{item.name}</option>
        ))}
    </select>
) : null;

export default function Dropdown({ defaultValue, label, items, callbackDropdownFn, disabled }: DropdownProps) {

    const [selections, setSelections] = useState<any[]>([]);
    const [value, setValue] = useState<any>();

    const onChangeHandler = (event: SyntheticEvent) => {
        const selectedItem = event.target as HTMLInputElement;
        if (callbackDropdownFn) {
            console.log("Invoke");
            
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
            setSelections(items);

        }

        // if (callbackDropdownFn) {
        //     callbackDropdownFn(defaultValue)
        // }
    }, []);

    useEffect(() => {
        setValue(selections.find(item => {
            return item.name === `${defaultValue}`;
        }));

    }, [selections]);

    return <section className="flex flex-col p-5 md:p-0 w-full">
        <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        {value && <RenderConditionally options={selections} selected={value.name} onChangeCallback={onChangeHandler} disabled={disabled} />}
    </section>;
}