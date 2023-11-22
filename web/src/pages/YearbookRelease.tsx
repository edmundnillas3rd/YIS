import YearbookReleasedPopup from "../components/YearbookRelease/YearbookReleasedPopup";
import YearbookReleasedTable from "../components/YearbookRelease/YearbookRreleasedTable";

export default function YearbookReleased() {

    return (
        <>
            {/* <YearbookReleasedPopup /> */}
            <article className="flex flex-col p-10 gap-0">
                <YearbookReleasedTable />
            </article>
        </>
    );
}