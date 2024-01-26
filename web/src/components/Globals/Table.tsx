import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import Row from "../Table/Row";
import { Pagination } from ".";

interface TableProps {
    columns: any[];
    datas: any[];
    buttonRowName?: string,
    onClickCallback: (data: any) => void;
}

let PageSize = 25;

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

    const [currentPage, setCurrentPage] = useState(1);

    const [attributes, setAttributes] = useState<any[]>([]);
    const [rows, setRows] = useState<any[]>([]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return datas.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    useEffect(() => {
        if (datas) {
            setRows(datas);
        }

        if (columns) {
            setAttributes(columns.map((col: any) => ({ key: uuid(), value: col })));
        }
    }, [datas, columns]);

    return (
        <section>
            <table className="w-full table-auto p-2 rounded mb-5">
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
                {currentTableData && currentTableData.map((row, index) => (
                    <Row
                        key={row?.uuid}
                        data={row}
                        buttonRowName={buttonRowName}
                        onClickCallback={onRowClickHandler}
                    />
                ))}

            </table>
            <section className="flex flex-row flex-auto justify-center">
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={rows.length}
                    pageSize={PageSize}
                    onPageChange={(page: any) => setCurrentPage(page)}
                />
            </section>
        </section>

    );
}