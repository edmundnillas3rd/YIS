import { useState } from "react";
import Button from "../globals/Button";

export default function ({ data, children, ...otherProps }: any) {
    const [values, setValues] = useState(Object.values(data));

    return (
        <section className="flex flex-row flex-auto gap-1 bg-slate-50 p-2 rounded drop-shadow-md">
            <section
                className="flex flex-row flex-auto gap-1 p-2"
                {...otherProps}
            >
                {
                    values.map((value: any, index) => {

                        if (typeof value === "number") return <></>;

                        return (
                            <p className="flex-auto" key={index}>
                                {value}
                            </p>
                        );
                    })
                }
            </section>
            <Button>
                Edit
            </Button>
        </section>
    );
}