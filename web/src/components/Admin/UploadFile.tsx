import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Container, Dropdown, Input, Spinner } from "../Globals";
import { generateYearRange } from "../../utilities/generateYearRange";
import { read, writeFileXLSX } from "xlsx";
import FileSaver from "file-saver";

export default function () {

    const [file, setFile] = useState<string | Blob>("");
    const [userFile, setUserFile] = useState<string | Blob>("");
    const [photosFile, setPhotosFile] = useState<string | Blob>("");
    const [loading1, setLoading1] = useState<boolean>(false);
    const [loading2, setLoading2] = useState<boolean>(false);
    const [loading3, setLoading3] = useState<boolean>(false);
    const [loading4, setLoading4] = useState<boolean>(false);
    const [year, setYear] = useState<string>("");

    const years = generateYearRange();

    useEffect(() => {
        if (years.length > 0) {
            setYear(years[0].toString() as string);
        }
    }, [years]);

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
        formData.append("year", year);


        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/upload-users`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

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

        } catch (error) {
            console.error(error);
        }

        setLoading3(false);
    };

    const onDownloadSolicitation = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/download-solicitation`);
            const buffer = await response.arrayBuffer();
            const bytes = new Uint8Array(buffer);

            const workbook = read(bytes);
            writeFileXLSX(workbook, "solicitation-backup.xlsx");
        } catch (error) {
            console.error(error);

        }
    };

    const onDownloadYearbookRelease = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/download-yearbook-released`);
            const buffer = await response.arrayBuffer();
            const bytes = new Uint8Array(buffer);

            const workbook = read(bytes);
            writeFileXLSX(workbook, "yearbook-released-backup.xlsx");
        } catch (error) {
            console.error(error);

        }
    };

    const onDownloadInfoHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/download-student-info`);
            const blob = await response.blob();
            FileSaver.saveAs(blob, `yearbook.docx`);

        } catch (error) {
            console.error(error);

        }

    };

    const onDownloadYearbookPhotosRelease = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/download-yearbook-photos`);
            const blob = await response.blob();
            FileSaver.saveAs(blob, `yearbook-photos-released.docx`);

        } catch (error) {
            console.error(error);

        }
    }

    const onUpdateGraduatingYear = async (event: SyntheticEvent) => {
        event.preventDefault();

        setLoading4(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/update-graduating-year`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    year
                })
            })
        } catch (error) {
            console.error(error);
        } finally {
            setLoading4(false);
        }
    }

    return (
        <Container >
            <h3 className="font-bold">MANAGE FILES</h3>

            <form
                method="POST"
                encType="multipart/form-data"
                onSubmit={onSubmitSoliHandler}
            >
                <section className="flex flex-row items-center gap-4 mt-5">


                    <Input
                        title="SOLICITATION FORM"
                        type="file"
                        name="solicitation-sheet"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={(event: any) => {
                            event.preventDefault();
                            setFile(event.target.files[0]);
                        }}
                        width="w-1/2"
                    />




                    <h3 className="text-grey-400">
                        NOTE: Upload the spreadsheet/excel file containing all solicitations form that were released.
                    </h3>
                </section>
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

                <section className="flex flex-row items-center gap-4 mt-5">
                    <Input
                        title="USERS"
                        type="file"
                        name="graduating-students-sheet"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={(event: any) => {
                            event.preventDefault();
                            setUserFile(event.target.files[0]);
                        }}
                        width="w-1/2"
                    />
                    <Dropdown
                        label="SCHOOL YEAR"
                        value={year}
                        datas={years}
                        name="year"
                        onChange={(event: any) => {
                            event.preventDefault();
                            setYear(event.target.value);
                        }}
                        width="w-1/2"
                    />
                    {/* <Button onClick={onUpdateGraduatingYear}>{!loading4 ?
                        "Update" : (
                            <Spinner />
                        )
                    }</Button> */}
                    <h3 className="text-grey-400">
                        NOTE: Upload the spreadsheet/excel file containing all graduating students from the registrar.
                    </h3>
                </section>


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
                <section className="flex flex-row items-center gap-4 mt-5">

                    <Input
                        title="YEARBOOK PICTURES"
                        type="file"
                        name="yearbook-photos-sheet"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={(event: any) => {
                            event.preventDefault();
                            setPhotosFile(event.target.files[0]);
                        }}
                        width="w-1/2"
                    />
                    <h3 className="text-grey-400">
                        NOTE: Upload the spreadsheet/excel file containing all data for the yearbook-pictures.
                    </h3>
                </section>


                <Button>{!loading3 ?
                    "Upload" : (
                        <Spinner />
                    )
                }</Button>
            </form>
            <Button onClick={onDownloadSolicitation}>Download Solicitation</Button>
            <Button onClick={onDownloadYearbookRelease}>Download Yearbook Released</Button>
            <Button onClick={onDownloadYearbookPhotosRelease}>Download Yearbook Photos</Button>
            <Button onClick={onDownloadInfoHandler}>Download Student Yearbook Info</Button>
        </Container>

    );
}