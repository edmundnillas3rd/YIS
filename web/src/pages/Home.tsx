import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

interface SelectionProps {
    index: number;
    src: string;
    url: string;
    callbackFn: (num: number) => void;
    children?: React.ReactNode;
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
    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const [currentIndex, setIndex] = useState<number>(0);
    const [disabled, setDisable] = useState<boolean>(true);
    const [previousIndex, setPreviousIndex] = useState<number>(currentIndex);
    const [backgroundClassStyle, setBackgroundStyle] = useState<String>("bg-no-repeat");
    const role = import.meta.env.VITE_USER_ROLE;
    const claimed = import.meta.env.VITE_STUB_CLAIM;

    useEffect(() => {
        if (role === "admin") {
            setDisable(false);
        }

        if (currentUser)
            console.log(currentUser);

    }, []);

    const images = [
        "/assets/cjc-logo.png",
        "/assets/envelope.png",
        "/assets/norbert-building.png",
        "/assets/graduation-photo.png",
        "/assets/yearbook-stock.jpg"
    ];

    useEffect(() => {
        setBackgroundStyle(currentIndex !== previousIndex && currentIndex !== 0 ? "fade-in bg-cover" : "bg-no-repeat");
    }, [currentIndex]);

    const callbackFn = (i: number) => {
        setPreviousIndex(currentIndex);
        setIndex(i);
    };

    return (
        <article className="flex flex-col md:flex-row py-10 md:p-0 md:h-full">
            {<figure key={currentIndex} className={`${backgroundClassStyle} w-1/2 bg-center hidden md:block md:h-screen`} style={{
                backgroundImage: `url(${images[currentIndex]})`
            }} />}
            <section className="flex flex-auto flex-col gap-0 justify-center items-center">
                {/* {!disabled && (role === "admin") &&
                    (
                        <>
                            <hr className="bg-slate-950 opacity-40 w-3/5 my-5 h-0.5" />
                            <h3 className="font-bold w-3/5 text-left mb-3">Admin Section</h3>
                            <Selection index={1} src="/assets/quote-request.png" url="/section/solicitation" callbackFn={callbackFn} disabled={disabled}>
                                <p>SOLICITATION</p>
                            </Selection>
                            <hr className="bg-slate-950 opacity-40 w-3/5 my-5 h-0.5" />
                            <h3 className="font-bold w-3/5 text-left mb-3">Student Section</h3>
                        </>
                    )} */}
                <Selection index={1} src="/assets/quote-request.png" url="/section/solicitation" callbackFn={callbackFn} disabled={disabled}>
                    SOLICITATION
                </Selection>
                <Selection index={2} src="/assets/college-school-icon.png" url="/section/colleges" callbackFn={callbackFn}>
                    COLLEGES
                </Selection>
                <Selection index={3} src="/assets/yearbook.png" url="/section/yearbook-photos" callbackFn={callbackFn}>
                    YEARBOOK PHOTOS
                </Selection>
                {currentUser && <Selection index={4} src="/assets/yearbook-2.png" url="/section/yearbook-released" callbackFn={callbackFn} disabled={(currentUser as any).claimStatus !== "RETURNED"}>
                    YEARBOOK RELEASED
                    {currentUser && (currentUser as any).claimStatus !== "RETURNED" && <p className="font-bold text-slate-500">(Please get the claim stub)</p>}
                </Selection>}
            </section>
        </article>
    );
}
