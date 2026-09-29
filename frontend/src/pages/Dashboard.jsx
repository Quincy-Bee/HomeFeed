import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const token = localStorage.getItem("token");

    useEffect(() => {

        const fetchListings = async () => {

            try {

                const response = await fetch(
                    "/api/listings/my-listings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to load listings"
                    );
                }

                setListings(data);

            } catch (error) {

                console.error(
                    "Dashboard listings error:",
                    error
                );

                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        fetchListings();

    }, [token]);


    // DELETE LISTING
    const deleteListing = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this listing?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await fetch(
                `/api/listings/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete listing"
                );
            }

            setListings((currentListings) =>
                currentListings.filter(
                    (listing) =>
                        listing._id !== id
                )
            );

        } catch (error) {

            console.error(
                "Delete listing error:",
                error
            );

            alert(error.message);
        }
    };


    // LISTING HEADING
    const getListingHeading = (listing) => {

        const type =
            listing.listingType === "For Rent"
                ? "Rental"
                : listing.propertyType;

        if (type && listing.neighborhood) {
            return `${type} in ${listing.neighborhood}`;
        }

        return listing.title || "Listing";
    };


    // LOADING
    if (loading) {
        return (
            <div className="dashboard">
                <h2>Loading listings...</h2>
            </div>
        );
    }


    // ERROR
    if (error) {
        return (
            <div className="dashboard">
                <h2>{error}</h2>
            </div>
        );
    }


    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <h1>
                        Dashboard
                    </h1>

                    {user.accountType === "fsbo" && (
                        <p>
                            For Sale by Owner
                        </p>
                    )}

                    {user.accountType === "frbo" && (
                        <p>
                            For Rent by Owner
                        </p>
                    )}

                    {user.role === "admin" && (
                        <p>
                            Admin • All Listings
                        </p>
                    )}
                </div>


                {/* CREATE LISTING BUTTONS */}

                <div className="create-buttons">

                    <Link
                        to="/dashboard/create?type=sale"
                        className="create-button"
                    >
                        Create For Sale Listing
                    </Link>

                    <Link
                        to="/dashboard/create?type=rent"
                        className="create-button"
                    >
                        Create For Rent Listing
                    </Link>

                </div>

            </div>


            {listings.length === 0 ? (

                <div className="empty-dashboard">

                    <h2>
                        No listings yet.
                    </h2>

                    <div className="create-buttons">

                        <Link
                            to="/dashboard/create?type=sale"
                            className="create-button"
                        >
                            Create For Sale Listing
                        </Link>

                        <Link
                            to="/dashboard/create?type=rent"
                            className="create-button"
                        >
                            Create For Rent Listing
                        </Link>

                    </div>

                </div>

            ) : (

                <div className="dashboard-listings">

                    {listings.map((listing) => {

                        const firstImage =
                            listing.images?.[0] || "";

                        return (

                            <div
                                className="dashboard-card"
                                key={listing._id}
                            >

                                {firstImage ? (

                                    <img
                                        src={firstImage}
                                        alt={getListingHeading(
                                            listing
                                        )}
                                    />

                                ) : (

                                    <div className="dashboard-image-placeholder">
                                        No Image
                                    </div>

                                )}


                                <div className="dashboard-card-content">

                                    <h3>
                                        {getListingHeading(
                                            listing
                                        )}
                                    </h3>


                                    <p>
                                        {listing.address}

                                        {listing.apartmentNumber &&
                                            ` ${listing.apartmentNumber}`}
                                    </p>


                                    <p>
                                        {listing.city},{" "}
                                        {listing.state}{" "}
                                        {listing.zipCode}
                                    </p>


                                    <p className="dashboard-price">

                                        $
                                        {Number(
                                            listing.price
                                        ).toLocaleString()}

                                        {listing.listingType ===
                                            "For Rent" &&
                                            "/month"}

                                    </p>


                                    <p>
                                        {listing.bedrooms} Bed •{" "}
                                        {listing.bathrooms} Bath
                                    </p>


                                    {user.role === "admin" &&
                                        listing.owner && (

                                            <p className="dashboard-listed-by">

                                                Listed by{" "}

                                                {listing.owner
                                                    .brokerage ||
                                                    listing.owner
                                                        .name}

                                            </p>

                                        )}


                                    <div className="dashboard-actions">

                                        <Link
                                            to={`/dashboard/edit/${listing._id}`}
                                            className="edit-button"
                                        >
                                            Edit
                                        </Link>


                                        <button
                                            type="button"
                                            className="delete-button"
                                            onClick={() =>
                                                deleteListing(
                                                    listing._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>
    );
}

export default Dashboard;