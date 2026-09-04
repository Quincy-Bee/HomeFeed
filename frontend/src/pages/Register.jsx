import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });


    const handleChange = (event) => {

        setUser({
            ...user,
            [event.target.name]: event.target.value
        });

    };


    const registerUser = (event) => {

        event.preventDefault();


        fetch("/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        })

            .then((response) => response.json())

            .then((data) => {

                console.log("Registered:", data);

                navigate("/login");

            })

            .catch((error) => {

                console.log("Register error:", error);

            });

    };

    return (

        <div className="auth-container">

            <h1>Create Seller Account</h1>


            <form onSubmit={registerUser}>


                <input
                    name="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                />

                <button>
                    Register
                </button>

            </form>

        </div>

    );

}

export default Register;