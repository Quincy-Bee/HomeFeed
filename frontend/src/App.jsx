import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Navbar from "./components/Navbar";
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

            </Routes>

        </>

    );
}

export default App;