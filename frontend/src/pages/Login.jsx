import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";


function Login() {

    const navigate = useNavigate();


    const [user, setUser] = useState({
        email: "",
        password: ""
    });



    const handleChange = (event) => {

        setUser({
            ...user,
            [event.target.name]: event.target.value
        });

    };



    // Login user

    const loginUser = (event) => {

        event.preventDefault();


        fetch("http://localhost:3000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        })


            .then((response) => response.json())


            .then((data) => {


                console.log("Login successful:", data);


                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                navigate("/dashboard");


            })


            .catch((error) => {

                console.log("Login error:", error);

            });

    };



    return (

        <div className="auth-container">


            <h1>Seller Login</h1>



            <form onSubmit={loginUser}>


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



                <button type="submit">
                    Login
                </button>


            </form>


        </div>

    );

}


export default Login;