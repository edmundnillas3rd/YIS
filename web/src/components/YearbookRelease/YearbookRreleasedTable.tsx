import { generateYearRange } from "../../utilities/generateYearRange";
import Dropdown from "../Dropdown";

export default function YearbookReleasedTable() {
    return (
        <section className="border border-1 border-zinc-300 h-screen p-2 mt-2 rounded">
            <section className="flex justify-center w-full p-5">
                <h3 className="font-bold">DATABASE</h3>
            </section>
            <section className="flex justify-center w-full p-5">
                <Dropdown label="S.Y." defaultValue="2000" items={generateYearRange(2000)}/>
            </section>
        </section>
    );
}