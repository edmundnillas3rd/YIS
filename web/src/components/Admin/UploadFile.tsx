import { SyntheticEvent, useState } from "react";
import { Button, Input, Spinner } from "../Globals";

export default function () {

    const [file, setFile] = useState<string | Blob>("");
    const [userFile, setUserFile] = useState<string | Blob>("");
    const [photosFile, setPhotosFile] = useState<string | Blob>("");
    const [loading1, setLoading1] = useState<boolean>(false);
    const [loading2, setLoading2] = useState<boolean>(false);
    const [loading3, setLoading3] = useState<boolean>(false);

    const onSubmitSoliHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading1(true);
        const formData = new FormData();

        formData.append("solicitation-sheet", file);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/solicitation/upload-solicitation-file`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            if (response.ok) {
                console.log("Sucessfully uploaded file");
            }

        } catch (error) {
            console.error(error);
        }
        setLoading1(false);
    };

    const onSubmitUserHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading2(true);
        const formData = new FormData();

        formData.append("graduating-students-sheet", userFile);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/upload-users`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            if (response.ok) {
                console.log("Sucessfully uploaded file");
            }

        } catch (error) {
            console.error(error);
        }
        setLoading2(false);
    };

    const onSubmitYearbookPhotoHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        setLoading3(true);
        const formData = new FormData();

        formData.append("yearbook-photos-sheet", photosFile);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/yearbooks/upload-yearbook-photos`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            if (response.ok) {
                console.log("Sucessfully uploaded file");
            }

        } catch (error) {
            console.error(error);
        }

        setLoading3(false);
    };

    return (
        <section className="flex flex-col gap-3 p-2">

            <form
                method="POST"
                encType="multipart/form-data"
                onSubmit={onSubmitSoliHandler}
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
                    width="w-1/2"
                />
                <Button>{!loading1 ?
                    "Upload" : (
                        <Spinner />
                    )
                }</Button>
            </form>
            <form
                method="POST"
                name=""
                encType="multipart/form-data"
                onSubmit={onSubmitUserHandler}
            >
                <h3 className="font-bold">
                    Upload the spreadsheet/excel file containing all graduating students from the registrar.
                </h3>
                <Input
                    type="file"
                    name="graduating-students-sheet"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={(event: any) => {
                        event.preventDefault();
                        console.log(event.target.files);
                        setUserFile(event.target.files[0]);
                    }}
                    width="w-1/2"
                />
                <Button>{!loading2 ?
                    "Upload" : (
                        <Spinner />
                    )
                }</Button>
            </form>
            <form
                method="POST"
                encType="multipart/form-data"
                onSubmit={onSubmitYearbookPhotoHandler}
            >
                <h3 className="font-bold">
                    Upload the spreadsheet/excel file containing all data for the yearbook-pictures.
                </h3>
                <Input
                    type="file"
                    name="yearbook-photos-sheet"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={(event: any) => {
                        event.preventDefault();
                        console.log(event.target.files);
                        setPhotosFile(event.target.files[0]);
                    }}
                    width="w-1/2"
                />
                <Button>{!loading3 ?
                    "Upload" : (
                        <Spinner />
                    )
                }</Button>
            </form>
        </section>

    );
}