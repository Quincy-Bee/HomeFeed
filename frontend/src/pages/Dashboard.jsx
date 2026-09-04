import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const [listings, setListings] = useState([]);


    useEffect(() => {

        fetch("/api/listings")

            .then((response) => response.json())

            .then((data) => {
                setListings(data);
            })

            .catch((error) => {
                console.log("Error fetching listings:", error);
            });

    }, []);



    const deleteListing = (id) => {

        fetch(`/api/listings/${id}`, {

            method: "DELETE",

        })

            .then((response) => response.json())

            .then(() => {

                setListings((currentListings) =>
                    currentListings.filter(
                        (listing) => listing._id !== id
                    )
                );

            })

            .catch((error) => {

                console.log("Delete error:", error);

            });

    };



    return (

        <div className="dashboard">


            <div className="dashboard-header">

                <h1>Agent Dashboard</h1>


                <Link
                    className="create-button"
                    to="/dashboard/create"
                >
                    Create Listing
                </Link>


            </div>



            <div className="dashboard-listings">


                {listings.map((listing) => (


                    <div
                        className="dashboard-card"
                        key={listing._id}
                    >


                        <img
                            src={listing.image}
                            alt={listing.title}
                        />



                        <div className="dashboard-card-content">


                            <h3>
                                {listing.title}
                            </h3>



                            <p className="dashboard-price">
                                ${listing.price}
                            </p>



                            <p>
                                {listing.address}
                            </p>



                            <p>
                                {listing.bedrooms} Beds | {listing.bathrooms} Baths
                            </p>



                            <div className="dashboard-actions">


                                <Link
                                    className="edit-button"
                                    to={`/dashboard/edit/${listing._id}`}
                                >
                                    Edit
                                </Link>



                                <button
                                    className="delete-button"
                                    onClick={() => deleteListing(listing._id)}
                                >
                                    Delete
                                </button>


                            </div>


                        </div>


                    </div>


                ))}


            </div>


        </div>

    );

}


export default Dashboard;