import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Auth.css";

function FSBORegister() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {

        setUser({
            ...user,
            [event.target.name]: event.target.value
        });

    };

    const registerUser = async (event) => {

        event.preventDefault();

        setError("");

        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            const response = await fetch("/api/auth/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    password: user.password,
                    accountType: "fsbo"
                })

            });

            const text = await response.text();

            console.log("Server response:", text);

            let data = {};

            try {
                data = text ? JSON.parse(text) : {};
            } catch (error) {
                console.log("Invalid JSON response:", text);
            }

            if (!response.ok) {
                setError(data.message || "Registration failed.");
                return;
            }

            console.log("Registered:", data);

            navigate("/login");

        } catch (error) {

            console.log("Register error:", error);

            setError("Something went wrong. Please try again.");

        }

    };

    return (

        <div className="auth-container">

            <h1>Sell Your Property</h1>

            <p>
                Create your HomeFeed account to list your property for sale.
            </p>

            <form onSubmit={registerUser}>

                <input
                    name="name"
                    placeholder="Full Name"
                    value={user.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={user.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    required
                />

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <button type="submit">
                    Create Account
                </button>

            </form>

        </div>

    );

}

export default FSBORegister;