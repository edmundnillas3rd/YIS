import { useState } from "react";
import Row from "./Table/Row";
import Button from "./globals/Button";

interface TableProps {
    columns: any[];
    datas: any[];
    onClickCallback: any;
}

export default function ({ columns, datas, onClickCallback }: TableProps) {
    const [attributes, setAttributes] = useState(columns);
    return (
        <section className="flex flex-col gap-1 p-2 rounded ">
            <section className="flex flex-row flex-auto gap-1 p-2 border-b border-slate-400 ow-md mb-5">
                {/* Should display the column name */}
                {
                    attributes.map((attribute: any, index) => {

                        if (typeof attribute === "number") return <></>;

                        return (
                            <p className="flex-auto font-bold" key={index}>
                                {attribute}
                            </p>
                        );
                    })
                }
                
            </section>
            {datas.map((data, index) => (<Row key={index} data={data} />))}
        </section>
    );
}