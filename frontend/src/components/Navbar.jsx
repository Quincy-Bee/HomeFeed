import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";


function Navbar() {

    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("user");

        navigate("/login");

    };


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


            <Link to="/login">
                Login
            </Link>


            <button
                className="logout-button"
                onClick={logout}
            >
                Logout
            </button>


        </nav>

    );

}


export default Navbar;