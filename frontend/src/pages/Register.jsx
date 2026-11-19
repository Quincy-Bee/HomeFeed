
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        brokerage: "",
        headshot: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [imageError, setImageError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUser((prev) => ({
            ...prev,
            [name]: value
        }));

        if (name === "headshot") {
            setImageError(false);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleRemoveImage = () => {
        setUser((prev) => ({
            ...prev,
            headshot: ""
        }));

        setImageError(false);
    };

    const registerUser = async (event) => {
        event.preventDefault();
        setError("");

        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (user.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (user.headshot && imageError) {
            setError("Please enter a valid profile image URL or remove it.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: user.name.trim(),
                    email: user.email.trim().toLowerCase(),
                    phone: user.phone.trim(),
                    brokerage: user.brokerage.trim(),
                    headshot: user.headshot.trim(),
                    password: user.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed.");
                return;
            }

            navigate("/login");

        } catch (error) {
            console.error("Register error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <h1>Create Your HomeFeed Account</h1>

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
                    name="brokerage"
                    placeholder="Brokerage Name"
                    value={user.brokerage}
                    onChange={handleChange}
                    required
                />

                <div className="profile-image-section">

                    <label htmlFor="headshot">
                        Profile Photo (Optional)
                    </label>

                    <p>
                        Paste a direct link to your profile photo.
                        You can also skip this step and add one later.
                    </p>

                    <input
                        id="headshot"
                        name="headshot"
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        value={user.headshot}
                        onChange={handleChange}
                    />

                    {user.headshot && !imageError && (
                        <div className="profile-image-preview">
                            <img
                                src={user.headshot}
                                alt="Profile preview"
                                onError={handleImageError}
                            />

                            <button
                                type="button"
                                onClick={handleRemoveImage}
                            >
                                Remove Photo
                            </button>
                        </div>
                    )}

                    {imageError && (
                        <p className="image-error">
                            Unable to load this image.
                            Please check the URL.
                        </p>
                    )}

                </div>

                <input
                    name="password"
                    type="password"
                    placeholder="Password (minimum 8 characters)"
                    value={user.password}
                    onChange={handleChange}
                    minLength={8}
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

                <button type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

            </form>

        </div>
    );
}

export default Register;
