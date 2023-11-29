import { useEffect, useState } from "react";
import { Button } from "./Globals";

export default function ({ name, icon, onChange, children }: any) {
    const [display, setDisplay] = useState<boolean>(false);


    useEffect(() => {
        if (onChange)
            onChange(display);
    }, [display]);

    return (
        <section className="flex flex-row gap-1 items-center justify-end">
            {/* <Button onClick={(e: any) => { setDisplay(!display); }}>
                {display ? "Cancel" :
                    <>
                        {name}
                        {icon}
                    </>
                }
            </Button> */}
            {display ? (
                <>
                    <Button onClick={(e: any) => { setDisplay(!display); }}>
                        Cancel
                    </Button>
                    {children}
                </>
            ) : (
                <Button onClick={(e: any) => { setDisplay(!display); }}>
                    {name}
                    {icon}
                </Button>
            )}
        </section>
    );
}