import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <Link to="/">
                Listings
            </Link>

            <Link to="/dashboard">
                Dashboard
            </Link>

            <Link to="/dashboard/create">
                Create Listing
            </Link>

            <Link to="/register">
                Register
            </Link>

        </nav>
    );
}

export default Navbar;