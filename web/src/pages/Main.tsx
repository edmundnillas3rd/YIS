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
        <NavLink className="text-left flex w-2/3 flex-row items-center gap-10 py-3 px-2 rounded transition-all ease-in bg-transparent hover:bg-zinc-200"
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
            <figure>
                <img className="max-w-none w-14 h-14" src={src} alt="icon" />
            </figure>
            <p className="font-bold text-base">{children}</p>
        </NavLink> :
        <button className="text-left flex w-2/3 flex-row items-center gap-10 py-3 px-2 rounded transition-all ease-in bg-transparent hover:bg-zinc-200 cursor-not-allowed"
            onMouseEnter={e => {
                e.preventDefault();
                callbackFn(index);
            }}

            onMouseLeave={e => {
                e.preventDefault();
                callbackFn(0);
            }}
        >
            <figure>
                <img className="max-w-none w-14 h-14" src={src} alt="icon" />
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
        <article className="flex flex-col md:flex-row h-36 py-10 md:p-0 md:h-screen">
            <figure className={`flex w-1/2 bg-center ${currentIndex !== 0 ? "bg-cover": "bg-no-repeat"} hidden md:block md:h-screen`} style={{
                backgroundImage: `url(${images[currentIndex]})`
            }} />
            <section className="flex flex-auto flex-col gap-0 justify-center items-center">
                <Selection index={1} src="/assets/college-school-icon.png" url="/section/colleges" callbackFn={i => setIndex(i)}>COLLEGES</Selection>
                <Selection index={2} src="/assets/quote-request.png" url="/section/solicitation" callbackFn={i => setIndex(i)}>SOLICITATION</Selection>
                <Selection index={3} src="/assets/yearbook.png" url="/section/yearbook-photos" callbackFn={i => setIndex(i)}>YEARBOOK PHOTOS</Selection>
                <Selection index={4} src="/assets/yearbook-2.png" url="/section/yearbook-released" callbackFn={i => setIndex(i)} disabled={disabled}>YEARBOOK RELEASED</Selection>
                {disabled &&
                    <p className="font-bold text-slate-500">(Please get the claim stub)</p>
                }
            </section>
        </article>
    );
}
