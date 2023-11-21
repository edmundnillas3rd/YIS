import { SyntheticEvent, useEffect, useState } from "react";
import StudentTable from "../components/CustomTable";
import Spinner from "../components/Spinner";
import { searchStudents } from "../utilities/students";

export default function YearbookPhotos() {

    const [searchedData, setSearchData] = useState<string>("");
    const [results, setResults] = useState<any>();
    const [loading, setLoading] = useState(false);

    const [currentNode, setCurrentNode] = useState<any | null>(null);

    const onClickCallback = (i: any) => {
        setCurrentNode(i);
    };

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        setResults(null);
        setLoading(true);

        if (searchedData.length < 4) return;

        const response = await searchStudents(searchedData);

        const r = response.map(({ id, fullName, collegeName, ...attr }: any) => {
            return {
                id,
                college: collegeName,
                name: fullName
            };
        });

        console.log(r);
        setResults(r);
        setLoading(false);
    };

    const onChangeHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        setSearchData((e.target as HTMLInputElement).value);
    };

    return (
        <article className="flex flex-col p-10 gap-0">
            <section className="py-5 px-2 flex flex-col w-full border border-zinc-400 rounded">
                <form
                    className="flex justify-center gap-1"
                    onSubmit={onSubmitHandler}
                    method="post">
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 pr-10 py-1.5 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search Student Name"
                        onChange={onChangeHandler}
                    />
                    <button className="border p-1 rounded ring-1 ring-slate-400 ring-inset ring-gray-30 text-gray-600 flex-shrink-0" type="submit">{loading ? <Spinner /> : "Search"}</button>
                </form>
            </section>
            {results ? <StudentTable nodes={results} columns={["COLLEGE", "FULL NAME"]} mode="default" onClickCallback={onClickCallback} /> :
                <section className="flex flex-col justify-center items-center w-full py-10">
                    {loading && <Spinner />}
                </section>}

        </article>
    );
}