
{/* <section className="py-5 px-2 flex flex-col w-full border border-zinc-400 rounded">
<section className="flex flex-col">
    <label
        htmlFor="relation"
        className="block text-sm font-medium leading-6 text-gray-900">YEAR GRADUATED</label>
    <input
        type="text"
        name="relation"
        id="relation"
        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        pattern={regexInvalidSymbols}
        maxLength={50}
        required
        autoComplete="off"
    />
</section>
<section className="flex flex-col">
    <label
        htmlFor="relation"
        className="block text-sm font-medium leading-6 text-gray-900">COURSE</label>
    <input
        type="text"
        name="relation"
        id="relation"
        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        pattern={regexInvalidSymbols}
        maxLength={50}
        required
        autoComplete="off"
    />
</section>
<section className="flex flex-col">
    <label
        htmlFor="relation"
        className="block text-sm font-medium leading-6 text-gray-900">NAME OF STUDENT</label>
    <input
        type="text"
        name="relation"
        id="relation"
        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        pattern={regexInvalidSymbols}
        maxLength={50}
        required
        autoComplete="off"
    />
</section>
<section className="flex flex-col">
    <label
        htmlFor="relation"
        className="block text-sm font-medium leading-6 text-gray-900">COURSE</label>
    <input
        type="text"
        name="relation"
        id="relation"
        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        pattern={regexInvalidSymbols}
        maxLength={50}
        required
        autoComplete="off"
    />
</section>
<section className="flex flex-col">
    <label
        htmlFor="time-released"
        className="block text-sm font-medium leading-6 text-gray-900">TIME RELEASED</label>
    <input
        type="time"
        name="time-released"
        id="time-released"
        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        pattern={regexInvalidSymbols}
        maxLength={50}
        required
        autoComplete="off"
    />
</section>
<section className="flex flex-col">
    <label
        htmlFor="date-released"
        className="block text-sm font-medium leading-6 text-gray-900">DATE</label>
    <input
        type="date"
        name="date-released"
        id="date-released"
        className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        pattern={regexInvalidSymbols}
        maxLength={50}
        required
        autoComplete="off"
    />
</section>
<h3 className="font-bold mt-6">Care Of</h3>
<section className="flex gap-2 mt-2">
    <section className="flex flex-col">
        <label htmlFor="receiver-family-name" className="block text-sm font-medium leading-6 text-gray-900">Family Name</label>
        <input
            type="text"
            name="receiver-family-name"
            id="receiver-family-name"
            className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            pattern={regexInvalidSymbols}
            maxLength={50}
            required
            autoComplete="off"
        />
    </section>
    <section className="flex flex-col">
        <label htmlFor="receivor-first-name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
        <input
            type="text"
            name="receiver-first-name"
            id="receiver-first-name"
            className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            pattern={regexInvalidSymbols}
            maxLength={50}
            required
            autoComplete="off"
        />
    </section>
    <section className="flex flex-col">
        <label htmlFor="receivor-middle-name" className="block text-sm font-medium leading-6 text-gray-900">Middle Name</label>
        <input
            type="text"
            name="receiver-middle-name"
            id="receiver-middle-name"
            className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            pattern={regexInvalidSymbols}
            maxLength={50}
            required
            autoComplete="off"
        />
    </section>
    <section className="relative flex flex-col">
        <label htmlFor="receiver-suffix" className="block text-sm font-medium leading-6 text-gray-900 ">Suffix</label>
        <input
            type="text"
            name="receiver-suffix"
            id="receiver-suffix"
            className="block text-center rounded-md border-0 py-1.5 md:w-14 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            maxLength={4}
            pattern={`(IX|X|IV|V?(I{0,3})|SR|JR|)?`}
            autoComplete="off"
        />
        <p className="absolute text-center w-full top-16 text-slate-600 text-xs font-bold">(E.G. SR, JR, III, IV, V)</p>
    </section>
    <section className="flex flex-col">
        <label htmlFor="relation" className="block text-sm font-medium leading-6 text-gray-900">Relation</label>
        <input
            type="text"
            name="relation"
            id="relation"
            className="block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-slate-400 ring-inset ring-gray-30 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            pattern={regexInvalidSymbols}
            maxLength={50}
            required
            autoComplete="off"
        />
    </section>
</section>
</section> */}

export default function YearbookReleasedPopup() {
    const regexInvalidSymbols = "[^\"\'\.\,\$\#\@\!\~\`\^\&\%\*\(\)\-\+\=\\\|\/\:\;\>\<\?]+";

    return (
        <section className="flex justify-center items-center absolute z-10 bg-black bg-opacity-70 w-full h-full top-0 right-0">
            <section className="bg-white border border-zinc-400 rounded flex flex-col md:w-1/2 p-10 gap-2">
            </section>
        </section>
    );

}