import React from "react";
import { NavLink } from "react-router-dom";

interface CollegeItemProps {
    src: string;
    url: string;
    children?: React.JSX.Element[] | React.JSX.Element;
}

const CollegeItem = ({ src, url, children }: CollegeItemProps) => (
    <NavLink
        className="flex flex-row md:border-0 border-2 border-zinc-400 p-5 justify-center items-center gap-5 rounded transition-all ease-in bg-transparent hover:bg-zinc-200"
        to={url}
    >
        <figure className="w-96 h-96">
            <img className="max-w-none w-full h-full" src={src} alt="college" />
        </figure>
        {/* <section className="flex-col justify-center items-center">
            {children}
        </section> */}
    </NavLink>
);

export default function Colleges() {
    return (
        <article className="flex flex-col w-full md:flex-row gap-10 py-10 md:overflow-x-auto">
            <CollegeItem src="/assets/cabe.png" url="/colleges/cabe">
                {/* <p className="text-center font-bold text-base">CABE</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF ACCOUNTANCY, BUSINESS AND ENTREPRENEURSHIP</p> */}
            </CollegeItem>
            <CollegeItem src="/assets/ccis.png" url="/colleges/ccis">
                {/* <p className="text-center font-bold text-base ">CCIS</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF COMPUTING AND INFORMATION SCIENCES</p> */}
            </CollegeItem>
            <CollegeItem src="/assets/cedas.png" url="/colleges/cedas">
                {/* <p className="text-center font-bold text-base ">CEDAS</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF EDUCATION ARTS AND SCIENCES</p> */}
            </CollegeItem>
            <CollegeItem src="/assets/coe.png" url="/colleges/coe">
                {/* <p className="text-center font-bold text-base">COE</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF ENGINEERING</p> */}
            </CollegeItem>
            <CollegeItem src="/assets/chs.png" url="/colleges/chs">
                {/* <p className="text-center font-bold text-base ">CHS</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF HEALTH SCIENCES</p> */}
            </CollegeItem>
            <CollegeItem src="/assets/csp.png" url="/colleges/csp">
                {/* <p className="text-center font-bold text-base ">CSP</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF SPECIAL PROGRAMS</p> */}
            </CollegeItem>
            <CollegeItem src="/assets/graduate-school.png" url="/colleges/graduate-school">
                {/* <p className="text-center font-bold text-base ">GRADUATE SCHOOL</p> */}
            </CollegeItem>
            <CollegeItem src="/assets/law-school.png" url="/colleges/law-school">
                {/* <p className="text-center font-bold text-base ">LAW SCHOOL</p> */}
            </CollegeItem>
        </article>
    );
}