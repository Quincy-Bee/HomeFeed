import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import EditListing from "./pages/EditListing";
import CreateListing from "./pages/CreateListing";
import Register from "./pages/Register";
import Login from "./pages/Login";

import "./App.css";

function App() {
    return (
        <>
            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/listings/:id"
                    element={<ListingDetails />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/dashboard/edit/:id"
                    element={<EditListing />}
                />

                <Route
                    path="/dashboard/create"
                    element={<CreateListing />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

            </Routes>

        </>
    );
}

export default App;