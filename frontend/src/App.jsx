import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import EditListing from "./pages/EditListing";
import CreateListing from "./pages/CreateListing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import NYCNeighborhoods from "./pages/NYCNeighborhoods";
import "./App.css";
import FSBO from "./components/FSBO";
import Manhattan from "./pages/Manhattan";
import Brooklyn from "./pages/Brooklyn.jsx";
import Queens from "./pages/Queens.jsx";
import TheBronx from "./pages/TheBronx.jsx";
import StatenIsland from "./pages/StatenIsland.jsx";

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
                    path="/nyc-neighborhoods"
                    element={<NYCNeighborhoods />}
                />

                <Route
                    path="/listings/:id"
                    element={<ListingDetails />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditListing />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/create"
                    element={
                        <ProtectedRoute>
                            <CreateListing />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
                

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/nyc-neighborhoods/manhattan"
                    element={<Manhattan />}
                />

                <Route
                    path="/nyc-neighborhoods/brooklyn"
                    element={<Brooklyn />}
                />

                 <Route
                    path="/nyc-neighborhoods/queens"
                    element={<Queens />}
                />

                 <Route
                    path="/nyc-neighborhoods/thebronx"
                    element={<TheBronx />}
                />

                <Route
                    path="/nyc-neighborhoods/staten-island"
                    element={<StatenIsland />}
                />


            </Routes>
            <FSBO />
            <Footer />
        </>
    );
}

export default App;