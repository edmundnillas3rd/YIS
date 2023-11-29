import { useState } from "react";
import { Button } from "./Globals/index";
import Row from "./Table/Row";

interface TableProps {
    columns: any[];
    datas: any[];
    onClickCallback: (data: any) => void;
}

export default function ({ columns, datas, onClickCallback }: TableProps) {

    const onRowClickHandler = (data: any) => {
        if (onClickCallback)
            onClickCallback(data);

        console.log(data);

    };

    const [attributes, setAttributes] = useState(columns);
    return (
        <table className="p-2 rounded mb-5">
            <tr className="p-2 border-b border-slate-400 mb-5">
                {/* Should display the column name */}
                {
                    attributes.map((attribute: any, index) => (
                        <td className="text-center font-bold" key={index}>
                            {attribute}
                        </td>
                    ))
                }

            </tr>
            {datas.map((data, index) => (<Row key={index} data={data} onClickCallback={onRowClickHandler} />))}
        </table>
    );
}