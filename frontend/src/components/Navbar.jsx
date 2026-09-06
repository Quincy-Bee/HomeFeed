import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";


function Navbar() {

    const navigate = useNavigate();

    const [user, setUser] = useState(() => {

        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;

    });



    const logout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

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

                    <span className="welcome-message">
                        Hello, {user.name}
                    </span>

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