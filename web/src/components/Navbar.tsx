import cjcLogo from "../assets/cjc-logo.png";

export default function Navbar() {
    return (
        <nav className="bg-red-600 p-4">
            <img src={cjcLogo} alt="cjc-logo" className="w-8 h-8 ml-3" />
        </nav>
    );
}