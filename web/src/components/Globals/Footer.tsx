export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <section className="text-center bg-red-600 text-slate-50 w-full p-4">
            <p>Website built by Edmund Nillas III.</p>
            <p>In collaboration with ACCS</p>
        </section>
    );
}