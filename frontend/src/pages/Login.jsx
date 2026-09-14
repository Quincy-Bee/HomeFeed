import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const loginUser = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                "/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(user)
                }
            );

            const data = await response.json();

            console.log("Login response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Login failed."
                );
            }

            if (!data.token) {
                throw new Error(
                    "No authentication token received."
                );
            }

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            setError(
                error.message ||
                "Unable to log in."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="auth-container">

            <h1>Agent Sign In</h1>

            {error && (
                <p className="auth-error">
                    {error}
                </p>
            )}

            <form onSubmit={loginUser}>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={user.email}
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

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

        </div>
    );
}

export default Login;