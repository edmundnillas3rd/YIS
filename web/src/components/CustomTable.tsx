import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from "@table-library/react-table-library/table";
import { SyntheticEvent, useEffect, useState } from "react";

interface CustomerTableProps {
    nodes: any[];
    columns: string[];
    mode: string;
    onClickCallback?: (i: any) => void;
    size?: number;
}

export default function CustomTable({ nodes, columns, mode, onClickCallback, size = 0 }: CustomerTableProps) {
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
        <section className="border border-1 border-zinc-300 h-full p-2 mt-2 rounded">
            <Table data={data}>
                {(tableList: any[]) => (
                    <>
                        <Header>
                            <HeaderRow>
                                {cellColumns.map((cell, i) => (<HeaderCell key={i}><p className="text-xs text-center whitespace-normal">{cell}</p></HeaderCell>))}
                            </HeaderRow>
                        </Header>

                        <Body>
                            {
                                tableList.map((item) => (
                                    <Row className="!cursor-pointer" key={item.id} item={item} onClick={(item, event) => {
                                        if (onClickCallback !== undefined)
                                            onClickCallback(item);

                                    }}>
                                        {Object.entries(item).map(([key, val], i) => {
                                            if (key === "id") return;
                                            return (
                                                <Cell key={i} className="border-zinc-200 text-base text-center whitespace-normal">
                                                    {val as string}
                                                </Cell>
                                            );
                                        })}
                                    </Row>
                                ))
                            }
                        </Body>
                    </>
                )}
            </Table>
        </section >
    );
}