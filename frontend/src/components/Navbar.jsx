import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser || savedUser === "undefined") {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch (error) {
            console.error("Invalid user data:", error);
            localStorage.removeItem("user");
            return null;
        }
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

            <Link to="/nyc-neighborhoods">
                Neighborhoods
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