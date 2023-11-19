import { SyntheticEvent, useEffect, useState } from "react";
import StudentTable from "../components/CustomTable";
import { searchStudents } from "../utilities/students";

export default function YearbookPhotos() {

    const [searchedData, setSearchData] = useState<string>("");
    const [results, setResults] = useState<any>();

    const nodes = [
        {
            id: '1',
            course: "Computer Science",
            familyName: "Nillas",
            firstName: "Edmund",
            middleName: "Pulvera",
        },
        {
            id: '2',
            course: "Computer Science",
            familyName: "Pecision",
            firstName: "Nicki",
            middleName: "Soli",
        }
    ];

    const [currentNode, setCurrentNode] = useState<any | null>(null);

    const onClickCallback = (i: any) => {
        setCurrentNode(i);
    };

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await searchStudents(searchedData);

        const r = response.map(({ id, fullName, collegeName,...attr}: any) => {
            return {
                id,
                college: collegeName,
                name: fullName
            }
        })

        console.log(r);
        setResults(r);
    };

    const onChangeHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        setSearchData((e.target as HTMLInputElement).value)
    };

    return (
        <article className="flex flex-col p-10 gap-0">
            <section className="py-5 px-2 flex flex-col w-full border border-zinc-400 rounded">
                <form
                    onSubmit={onSubmitHandler}
                    method="post">
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 pr-10 py-1.5 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search Student Name"
                        onChange={onChangeHandler}
                    />
                    <button type="submit">Search</button>
                </form>
            </section>
        {results && <StudentTable nodes={results} columns={["COLLEGE", "FULL NAME"]} mode="default" onClickCallback={onClickCallback} />}

        </article>
    );
}