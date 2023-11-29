import { SyntheticEvent, useEffect, useState } from "react";
import { Button } from "../Globals/index";

export default function ({ data, children, onClickCallback, ...otherProps }: any) {
    const [values, setValues] = useState(Object.values(data));

    useEffect(() => {

        // console.log(values.slice(1));
        // Remove the the first element which is the id
        setValues(values.slice(1));
    }, []);

    const onClick = (event: SyntheticEvent) => {
        event.preventDefault();
        if (onClickCallback)
            onClickCallback(data);
    };

    return (
        <tbody className="bg-slate-50 p-2 rounded drop-shadow-md">
            <tr
                className="p-2"
                {...otherProps}
            >
                {
                    values.map((value: any, index) => (
                        <td className="text-center" key={index}>
                            {value}
                        </td>
                    ))
                }
                <Button onClick={onClick}>
                    Edit
                </Button>
            </tr>
        </tbody>
    );
}