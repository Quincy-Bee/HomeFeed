import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
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

            </Routes>

        </>

    );
}

export default App;