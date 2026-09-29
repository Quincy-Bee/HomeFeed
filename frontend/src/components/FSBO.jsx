import { Link } from "react-router-dom";
import "./FSBO.css";

function FSBO() {

    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <section className="fsbo">

            <div className="fsbo-content">

                <h2>Want to rent or sell your home yourself?</h2>

                <div className="fsbo-links">

                    <Link
                        to={
                            isLoggedIn
                                ? "/dashboard"
                                : "/owner-auth?type=rent"
                        }
                        className="fsbo-link"
                    >
                        For Rent by Owner
                    </Link>

                    <Link
                        to={
                            isLoggedIn
                                ? "/dashboard"
                                : "/owner-auth?type=sale"
                        }
                        className="fsbo-link"
                    >
                        For Sale by Owner
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default FSBO;