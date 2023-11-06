import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from "@table-library/react-table-library/table";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SyntheticEvent, useEffect, useState } from "react";

interface CustomerTableProps {
    nodes: any[];
    columns: string[];
    mode: string;
}

export default function CustomTable({ nodes, columns, mode }: CustomerTableProps) {
    const [data, setData] = useState({ nodes });
    const [cellColumns, setCellCollumns] = useState<string[]>([...columns]);
    const [inputDisabled, setInputDisabled] = useState(true);

    const handleUpdate = (value: any, id: string, property: any) => {
        setData((state) => ({
            ...state,
            nodes: state.nodes.map((node: any) => {
                if (node.id === id) {
                    return { ...node, [property]: value };
                } else {
                    return node;
                }
            }),
        }));
    };

    const handleSubmit = (event: SyntheticEvent) => {
        const id = Math.floor(Math.random() * (9990 - 0 + 1)) + 0;
        const strId = id.toString() as string;

        event.preventDefault();

        setData((state) => ({
            ...state,
            nodes: state.nodes.concat({
                id: strId,
                organization: "--PLEASE SPECIFY YOUR ORGANIZATION--",
                position: "--PLEASE SPECIFY YOUR POSITION--",
                yearElected: "--PLEASE SPECIFY THE DURATION OF YOUR POSITION--",
                nodes: []
            })
        }));
    };

    useEffect(() => {
        if (mode == "edit") setInputDisabled(false);
        if (mode == "save") setInputDisabled(true);
    }, [mode]);

    return (
        <>
            <section className="flex flex-row w-full top-16 items-center place-content-between">
                {/* <button
                    className="flex flex-row justify-center items-center gap-3 font-bold text-slate-600 border border-1 border-dashed border-zinc-600 p-1 rounded"
                    onClick={handleSubmit}
                >
                    <p>Add</p>
                    <AiOutlinePlusCircle style={{
                        color: "#475569"
                    }} />
                </button> */}
            </section>
            <section className="border border-1 border-zinc-300 h-full p-2 mt-2 rounded">
                <Table data={data}>
                    {(tableList: any[]) => (
                        <>
                            <Header>
                                <HeaderRow>
                                    {cellColumns.map((cell, i) => (<HeaderCell key={i}>{cell}</HeaderCell>))}
                                </HeaderRow>
                            </Header>

                            <Body>
                                {
                                    tableList.map(item => (
                                        <Row key={item.id} item={item}>
                                            {Object.entries(item).map(([key, val]) => {
                                                if (key === "id") return;
                                                return <input className="border-zinc-200" type="text" value={val as string} disabled />;
                                            })}
                                        </Row>
                                    ))
                                }
                            </Body>
                        </>
                    )}
                </Table>
            </section >
        </>
    );
}