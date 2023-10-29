interface CollegeItemProps {
    src: string;
    children?: JSX.Element[];
}

const CollegeItem = ({ src, children }: CollegeItemProps) => (
    <section className="flex flex-row justify-center items-center gap-6">
        <figure>
            <img className="max-w-none w-16 h-16" src={src} alt="cabe" />
        </figure>
        <section className="flex flex-col justify-center items-center">
            {children}
        </section>
    </section>
);

export default function Colleges() {
    return (
        <article className="flex flex-column gap-10">
            <CollegeItem src="/assets/cabe.png">
                <p className="font-bold text-base">CABE</p>
                <p className="font-bold text-gray-500">COLLEGE OF ACCOUNTANCY, BUSINESS AND ENTREPRENEURSHIP</p>
            </CollegeItem>
            <CollegeItem src="/assets/ccis.png">
                <p className="font-bold text-base ">CCIS</p>
                <p className="font-bold text-gray-500">COLLEGE OF COMPUTING AND INFORMATION SCIENCES</p>
            </CollegeItem>
        </article>
    );
}