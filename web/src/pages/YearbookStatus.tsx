import { useState } from "react";
import Container from "../components/Container";

export default function YearbookStatus() {

    const [data, setData] = useState();

    return <article className="flex flex-col p-10 gap-0">
        <Container>
            <h3 className="font-bold mb-5">Yearbook Status</h3>
            <Container>
                <section className="flex flex-row items-center gap-5">
                    <h3 className="font-bold">Student Recipient:</h3>
                    <p>EDMUND PULVERA NILLAS III</p>
                </section>
                <section className="flex flex-row items-center gap-5">
                    <h3 className="font-bold">Status:</h3>
                    <span className="rounded-xl w-5 h-5 bg-yellow-500"></span>
                    <p>Pending</p>
                </section>
                <section className="flex flex-row items-center gap-5">
                    <h3 className="font-bold">Solicitation Status:</h3>
                    <span className="rounded-xl w-5 h-5 bg-green-500"></span>
                    <p>All Returned</p>
                </section>
                <section className="flex flex-row items-center gap-5">
                    <h3 className="font-bold">Payment Status:</h3>
                    <span className="rounded-xl w-5 h-5 bg-green-500"></span>
                    <p>Fully Paid</p>
                </section>
                <section className="flex flex-row items-center gap-5">
                    <h3 className="font-bold">Amount Paid:</h3>
                    <p>PHP 2200</p>
                </section>
            </Container>
        </Container>
    </article>;
}