import * as FileSaver from "file-saver";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button } from "../Globals";

export default function () {

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`);
                const data = await response.json();

                console.log(data);
                setDepartments(data['departments']);

            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <section className="flex flex-auto flex-col gap-1 p-1">
            {departments.map(department => (
                <section className="flex flex-row">
                    <section className="flex flex-auto justify-around">
                        {department['name']}
                    </section>
                    <section>
                        <Button onClick={async (event: SyntheticEvent) => {
                            event.preventDefault();
                            try {
                                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/${department['id']}/download-yearbook-info`);
                                const blob = await response.blob();
                                // const data = new Uint8Array(buffer);
                                // fs.writeFileSync(`${department['name']}.docx`, data);
                                FileSaver.saveAs(blob, `${department['acronym']}.docx`);
                                
                            } catch (error) {
                                console.error(error);
                                
                            }


                        }}>Download</Button>
                    </section>
                </section>
            ))}
        </section>
    );
}