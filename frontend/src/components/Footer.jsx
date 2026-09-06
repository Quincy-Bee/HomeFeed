
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Footer.css";
import SocialMedia from "./SocialMedia";

function Footer() {

    const [user] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-brand">

                    

                    <Link
                        to="/"
                        className="footer-logo"
                    >
                        HomeFeed
                    </Link>

                    <p>
                        Discover your next place in New York.
                    </p>

                    

                </div>

    <SocialMedia />

                <div className="footer-links">

                    <div className="footer-column">

                        <h3>Explore</h3>

                        <Link to="/">
                            Listings
                        </Link>

                        {!user && (
                            <>
                                <Link to="/register">
                                    Create Account
                                </Link>

                                <Link to="/login">
                                    Agent Sign In
                                </Link>
                            </>
                        )}

                    </div>


                    <div className="footer-column">

                        <h3>HomeFeed</h3>

                        {user && (
                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                        )}

                        <a href="#">
                            About
                        </a>

                        <a href="#">
                            Contact
                        </a>

                    </div>

                </div>

            </div>


            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} HomeFeed. All rights reserved.
                </p>

                <div>


                    <a href="#">
                        Privacy
                    </a>

                    <a href="#">
                        Terms
                    </a>

                </div>
               
            </div >
        
        </footer>

    );

}

export default Footer;