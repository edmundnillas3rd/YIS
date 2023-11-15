import { useState } from "react";
import StudentTable from "../components/CustomTable";

export default function YearbookPhotos() {

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

    return (
        <article className="flex flex-col p-10 gap-0">
            <section className="py-5 px-2 flex flex-col w-full border border-zinc-400 rounded">
                <input type="text" className="block w-full rounded-md border-0 pr-10 py-1.5 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search Student Name" />
            </section>
            <StudentTable nodes={nodes} columns={["COURSE", "FAMILY NAME", "FIRST NAME", "MIDDLE NAME"]} mode="default" onClickCallback={onClickCallback} />

        </article>
    );
}