import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Row from "../Table/Row";

interface TableProps {
    columns: any[];
    datas: any[];
    buttonRowName?: string,
    onClickCallback: (data: any) => void;
}

export default function ({ 
    columns, 
    datas, 
    buttonRowName = "Edit", 
    onClickCallback 
}: TableProps) {

    const onRowClickHandler = (data: any) => {
        if (onClickCallback)
            onClickCallback(data);
    };

    const [attributes, setAttributes] = useState<any[]>([]);
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        if (datas) {
            setRows(datas)
        }

        if (columns) {
            setAttributes(columns.map((col: any) => ({ key: uuid(), value: col })))
        }
    }, [datas, columns])

    return (
        <table className="table-auto p-2 rounded mb-5">
            <tbody>
                <tr className="p-2 border-b border-slate-400 mb-5">
                    {/* Should display the column name */}
                    {attributes && 
                        attributes.map((attr: any, index) => (
                            <td className="text-center font-bold" key={attr.key}>
                                {attr.value}
                            </td>
                        ))
                    }

                </tr>
            </tbody>
            {datas && datas.map((data, index) => (
                <Row
                    key={data?.uuid}
                    data={data}
                    buttonRowName={buttonRowName}
                    onClickCallback={onRowClickHandler}
                />
            ))}
        </table>
    );
}