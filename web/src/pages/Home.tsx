import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
        <NavLink className="text-left font-bold text-base flex w-2/3 flex-row items-center gap-10 py-3 px-2 rounded transition-all ease-in bg-transparent hover:bg-zinc-200"
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
            {children}
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
        if (import.meta.env.DEV) {
            setDisable(false);
        }

    }, []);

    const images = [
        "/assets/cjc-logo.png",
        "/assets/norbert-building.png",
        "/assets/envelope.png",
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
        <article className="flex flex-auto flex-col md:flex-row py-10 md:p-0 md:h-full">
            {<figure key={currentIndex} className={`${backgroundClassStyle} w-1/2 bg-center hidden md:block md:h-screen`} style={{
                backgroundImage: `url(${images[currentIndex]})`
            }} />}
            <section className="flex flex-auto flex-col gap-0 justify-center items-center">
                <section className="flex flex-col justify-start gap-2 w-full p-5 font-bold">
                    <p>SERVICES</p>
                    <hr className="bg-zinc-950" />
                </section>
                <Selection index={1} src="/assets/college-school-icon.png" url="/section/colleges" callbackFn={callbackFn}>
                    COLLEGES
                </Selection>
                <Selection index={1} src="/assets/cog-wheel.png" url="/section/account" callbackFn={callbackFn}>
                    ACCOUNT SETTINGS
                </Selection>
                {/* <Selection index={4} src="/assets/yearbook.png" url="/section/yearbook-preview" callbackFn={callbackFn}>
                    YEARBOOK PREVIEW
                </Selection> */}

                {currentUser && (currentUser['role'] === "CO-ADMIN" || currentUser['role'] === "ADMIN") && (
                    <>
                        <section className="flex flex-col justify-start gap-2 w-full p-5 font-bold">
                            <p>ADMIN & STAFF</p>
                            <hr className="bg-zinc-950" />
                        </section>
                        <Selection index={3} src="/assets/quote-request.png" url="/section/solicitation" callbackFn={callbackFn} disabled={disabled}>
                            SOLICITATION
                        </Selection>
                        <Selection index={4} src="/assets/yearbook.png" url="/section/yearbook-photos" callbackFn={callbackFn}>
                            YEARBOOK PHOTOS
                        </Selection>
                        {/* {currentUser && <Selection index={4} src="/assets/yearbook-2.png" url="/section/yearbook-released" callbackFn={callbackFn} disabled={(currentUser as any).claimStatus !== "RETURNED"}>
                    YEARBOOK RELEASED
                    {currentUser && (currentUser as any).claimStatus !== "RETURNED" && <p className="font-bold text-slate-500">(Please get the claim stub)</p>}
                </Selection>} */}
                        <Selection index={5} src="/assets/yearbook-2.png" url="/section/yearbook-released" callbackFn={callbackFn} disabled={false}>
                            YEARBOOK RELEASED
                            <p className="font-bold text-slate-500">(Please get the claim stub)</p>
                        </Selection>


                    </>
                )}
                {currentUser && currentUser['role'] === "ADMIN" && (
                    <Selection index={5} src="/assets/cog-wheel.png" url="/admin/settings" callbackFn={callbackFn} disabled={false}>
                        SETTINGS
                    </Selection>
                )
                }
            </section>
        </article>
    );
}
