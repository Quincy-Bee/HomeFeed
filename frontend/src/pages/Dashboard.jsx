import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

// DASHBOARD

function Dashboard() {

    const [listings, setListings] = useState([]);


    useEffect(() => {

        fetch("http://localhost:3000/api/listings")
            .then((response) => response.json())
            .then((data) => {
                setListings(data);
            })
            .catch((error) => {
                console.log("Error fetching listings:", error);
            });

    }, []);

    const deleteListing = (id) => {

        fetch(`http://localhost:3000/api/listings/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {

                // remove deleted listing from the screen
                setListings(
                    listings.filter((listing) => listing._id !== id)
                );

            })
            .catch((error) => {
                console.log("Delete error:", error);
            });

    };

    // buttons and listing info

    return (

        <div className="dashboard">

            <h1>Agent Dashboard</h1>

            <Link to="/dashboard/create">
                <button className="create-button">
                    Create Listing
                </button>
            </Link>


            <h2>My Listings</h2>


            <div>

                {listings.map((listing) => (

                    <div key={listing._id}>

                        <h3>
                            {listing.title}
                        </h3>

                        <p>
                            ${listing.price.toLocaleString()}
                        </p>

                        <p>
                            {listing.address}
                        </p>


                        <Link
                            className="edit-button"
                            to={`/dashboard/edit/${listing._id}`}
                        >
                            Edit
                        </Link>


                        <button
                            onClick={() => deleteListing(listing._id)}
                        >
                            Delete
                        </button>


                    </div>

                ))}

            </div>


        </div>

    );

}


export default Dashboard;