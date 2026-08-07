import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";


function Navbar() {

    const navigate = useNavigate();


    const [user, setUser] = useState(
        localStorage.getItem("user")
    );


    const logout = () => {

        localStorage.removeItem("user");

        setUser(null);

        navigate("/login");

    };


    return (

        <nav className="navbar">


            <Link to="/">
                Listings
            </Link>



            {user ? (

                <>

                    <Link to="/dashboard">
                        Dashboard
                    </Link>


                    <button
                        className="logout-button"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </>


            ) : (

                <>

                    <Link to="/register">
                        Register
                    </Link>


                    <Link to="/login">
                        Login
                    </Link>

                </>

            )}


        </nav>

    );

}


export default Navbar;