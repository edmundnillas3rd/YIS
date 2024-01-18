import { SyntheticEvent, useState } from "react";
import { Button, Input } from "../Globals";
import { useNavigate } from "react-router-dom";

export default function () {

    const [file, setFile] = useState<string | Blob>("");
    const navigate = useNavigate();

    const onSubmitHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("solicitation-sheet", file);

        (async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation/upload-solicitation-file`, {
                    method: "POST",
                    credentials: "include",
                    body: formData
                });

                if (response.ok) {
                    console.log("Sucessfully uploaded file");
                    navigate(0);
                }

            } catch (error) {
                console.error(error);
            }
        })();

    };

    return (
        <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={onSubmitHandler}
        >
            <h3 className="font-bold">
                Upload the spreadsheet/excel file containing all solicitations form that were released.
            </h3>
            <Input
                type="file"
                name="solicitation-sheet"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(event: any) => {
                    event.preventDefault();
                    console.log(event.target.files);
                    setFile(event.target.files[0]);
                }}
            />
            <Button>Upload</Button>
        </form>
    );
}