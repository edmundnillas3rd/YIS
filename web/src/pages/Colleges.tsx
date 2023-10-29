import React from "react";
import { NavLink } from "react-router-dom";

interface CollegeItemProps {
    src: string;
    url: string;
    children?: React.JSX.Element[] | React.JSX.Element;
}

const CollegeItem = ({ src, url, children }: CollegeItemProps) => (
    <NavLink className="flex flex-row md:border-0 border-2 border-zinc-400 md:px-5 py-3 justify-center items-center gap-5 rounded w-9/12 md:w-8/12 transition-all ease-in bg-transparent hover:bg-zinc-200" to={url}>
        <figure>
            <img className="max-w-none w-16 h-16" src={src} alt="cabe" />
        </figure>
        <section className="w-1/2 flex-col justify-center items-center">
            {children}
        </section>
    </NavLink>
);

export default function Colleges() {
    return (
        <article className="flex flex-col justify-center items-center gap-10 py-10 md:grid md:grid-cols-2 md:justify-items-center">
            <CollegeItem src="/assets/cabe.png" url="/division/cabe">
                <p className="text-center font-bold text-base">CABE</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF ACCOUNTANCY, BUSINESS AND ENTREPRENEURSHIP</p>
            </CollegeItem>
            <CollegeItem src="/assets/ccis.png" url="/division/ccis">
                <p className="text-center font-bold text-base ">CCIS</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF COMPUTING AND INFORMATION SCIENCES</p>
            </CollegeItem>
            <CollegeItem src="/assets/cedas.png" url="/division/cedas">
                <p className="text-center font-bold text-base ">CEDAS</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF EDUCATION ARTS AND SCIENCES</p>
            </CollegeItem>
            <CollegeItem src="/assets/coe.png" url="/division/coe">
                <p className="text-center font-bold text-base">COE</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF ENGINEERING</p>
            </CollegeItem>
            <CollegeItem src="/assets/chs.png" url="/division/chs">
                <p className="text-center font-bold text-base ">CHS</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF HEALTH SCIENCES</p>
            </CollegeItem>
            <CollegeItem src="/assets/csp.png" url="/division/csp">
                <p className="text-center font-bold text-base ">CSP</p>
                <p className="text-xs text-center font-bold text-gray-500">COLLEGE OF SPECIAL PROGRAMS</p>
            </CollegeItem>
            <CollegeItem src="/assets/graduate-school.png" url="/division/graduate-school">
                <p className="text-center font-bold text-base ">GRADUATE SCHOOL</p>
            </CollegeItem>
            <CollegeItem src="/assets/law-school.png" url="/division/law-school">
                <p className="text-center font-bold text-base ">LAW SCHOOL</p>
            </CollegeItem>
        </article>
    );
}