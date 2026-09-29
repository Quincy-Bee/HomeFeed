import { Link, useSearchParams } from "react-router-dom";
import "./OwnerAuth.css";

function OwnerAuth() {

    const [searchParams] = useSearchParams();

    const type = searchParams.get("type");

    const isRent = type === "rent";

    const title = isRent
        ? "Rent Your Property"
        : "Sell Your Property";

    const registerPath = isRent
        ? "/for-rent-by-owner"
        : "/for-sale-by-owner";

    return (
        <div className="owner-auth">

            <div className="owner-auth-content">

                <h1>
                    {title}
                </h1>

                <p>
                    List your property on HomeFeed and
                    connect with people looking for a home.
                </p>

                <div className="owner-auth-options">

                    <div className="owner-auth-option">

                        <h2>
                            Already have an account?
                        </h2>

                        <p>
                            Sign in to your HomeFeed account
                            to continue.
                        </p>

                        <Link
                            to="/login"
                            className="owner-auth-button"
                        >
                            Sign In
                        </Link>

                    </div>

                    <div className="owner-auth-option">

                        <h2>
                            New to HomeFeed?
                        </h2>

                        <p>
                            Create an account to list your
                            property.
                        </p>

                        <Link
                            to={registerPath}
                            className="owner-auth-button"
                        >
                            Create Account
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OwnerAuth;