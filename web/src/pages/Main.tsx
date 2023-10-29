import { useState } from "react";
import { NavLink } from "react-router-dom";

interface SelectionProps {
    index: number;
    src: string;
    url: string;
    callbackFn: (num: number) => void;
    children: string;
    disabled?: boolean;
};

const Selection = ({ index, src, url, callbackFn, children, disabled = false }: SelectionProps) => (
    !disabled ?
        <NavLink className="flex w-2/3 flex-row items-center gap-10 py-3 px-2 rounded transition-all ease-in bg-transparent hover:bg-zinc-200"
            to={url}
            onMouseEnter={e => {
                e.preventDefault();
                callbackFn(index);
            }}

            onMouseLeave={e => {
                e.preventDefault();
                callbackFn(0);
            }}
        >
            <figure className="w-12">
                <img className="w-max" src={src} alt="icon" />
            </figure>
            <p className="font-bold text-base">{children}</p>
        </NavLink> :
        <button className="flex w-2/3 flex-row items-center gap-10 py-3 px-2 rounded transition-all ease-in bg-transparent hover:bg-zinc-200 cursor-not-allowed"
            onMouseEnter={e => {
                e.preventDefault();
                callbackFn(index);
            }}

            onMouseLeave={e => {
                e.preventDefault();
                callbackFn(0);
            }}
        >
            <figure className="w-12">
                <img className="w-max" src={src} alt="icon" />
            </figure>
            <p className="font-bold text-base text-slate-500">{children}</p>
        </button>

);

export default function Main() {
    const [currentIndex, setIndex] = useState(0);
    const [disabled, setDisable] = useState(true);

    const images = [
        "/assets/cjc-logo.png",
        "/assets/norbert-building.png",
        "/assets/envelope.png",
        "/assets/graduation-photo.png",
        "/assets/yearbook-stock.jpg"
    ];

    return (
        <article className="flex flex-row h-screen">
            <figure className="flex w-1/2 h-screen justify-center items-center">
                <img className={`w-max ${currentIndex !== 0 ? "bg-cover h-screen" : ""}`} src={images[currentIndex]} alt="should be an image here" />
            </figure>
            <section className="flex flex-auto flex-col gap-0 justify-center items-center">
                <Selection index={1} src="/assets/college-school-icon.png" url="/colleges" callbackFn={i => setIndex(i)}>COLLEGES</Selection>
                <Selection index={2} src="/assets/quote-request.png" url="/solicitation" callbackFn={i => setIndex(i)}>SOLICITATION</Selection>
                <Selection index={3} src="/assets/yearbook.png" url="/yearbook-photos" callbackFn={i => setIndex(i)}>YEARBOOK PHOTOS</Selection>
                <Selection index={4} src="/assets/yearbook-2.png" url="/yearbook-released" callbackFn={i => setIndex(i)} disabled={disabled}>YEARBOOK RELEASED</Selection>
                {disabled &&
                    <p className="text-slate-500">(Please get the claim stub)</p>
                }
            </section>
        </article>
    );
}
