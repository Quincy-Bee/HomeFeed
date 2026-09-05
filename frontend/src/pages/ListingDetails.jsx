import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ListingDetails.css";

function ListingDetails() {
    const { id } = useParams();

    const [listing, setListing] = useState(null);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        fetch(`/api/listings/${id}`)
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load listing"
                    );
                }

                return data;
            })
            .then((data) => {
                setListing(data);
                setSelectedImage(0);
            })
            .catch((error) => {
                console.log(
                    "Listing details error:",
                    error
                );

                setError(error.message);
            });
    }, [id]);

    if (error) {
        return (
            <div className="listing-details">
                <h2>{error}</h2>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="listing-details">
                <h2>Loading...</h2>
            </div>
        );
    }

    const listingHeading =
        listing.listingType === "For Rent"
            ? "Rental"
            : listing.propertyType;

    const formattedPrice =
        Number(listing.price).toLocaleString();

    const images =
        listing.images && listing.images.length > 0
            ? listing.images
            : [];

    const mainImage =
        images[selectedImage] || "";

    const formattedDate = listing.createdAt
        ? new Date(listing.createdAt)
              .toLocaleDateString()
        : "";

    const daysOnMarket = listing.createdAt
        ? Math.max(
              0,
              Math.floor(
                  (
                      new Date() -
                      new Date(listing.createdAt)
                  ) /
                      (1000 * 60 * 60 * 24)
              )
          )
        : 0;

    return (
        <div className="listing-details">

            {/* ==========================================
                PHOTO GALLERY
            ========================================== */}

            {images.length > 0 ? (
                <div className="listing-gallery">

                    <div className="main-image-container">

                        <img
                            src={mainImage}
                            alt={`${listingHeading} in ${listing.neighborhood}`}
                            className="listing-main-image"
                        />

                    </div>

                    {images.length > 1 && (
                        <div className="listing-thumbnails">

                            {images.map(
                                (image, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`listing-thumbnail ${
                                            selectedImage === index
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedImage(
                                                index
                                            )
                                        }
                                    >

                                        <img
                                            src={image}
                                            alt={`Property photo ${
                                                index + 1
                                            }`}
                                        />

                                    </button>
                                )
                            )}

                        </div>
                    )}

                </div>
            ) : (
                <div className="listing-image-placeholder">
                    No Image Available
                </div>
            )}


            {/* ==========================================
                LISTING INFORMATION
            ========================================== */}

            <div className="listing-info">

                <div className="listing-header">

                    <div>

                        <h1 className="listing-title">
                            {listingHeading} in{" "}
                            {listing.neighborhood}
                        </h1>

                        <p className="listing-address">
                            {listing.address}
                            {listing.apartmentNumber &&
                                ` ${listing.apartmentNumber}`}
                        </p>

                        <p className="listing-location">
                            {listing.city},{" "}
                            {listing.state}{" "}
                            {listing.zipCode}
                        </p>

                    </div>

                    <div className="listing-price">

                        <h2>
                            ${formattedPrice}
                            {listing.listingType ===
                                "For Rent" &&
                                "/month"}
                        </h2>

                    </div>

                </div>


                {/* ==========================================
                    PROPERTY DETAILS
                ========================================== */}

                <div className="property-stats">

                    <div>
                        <strong>
                            {listing.bedrooms}
                        </strong>
                        <span>Bedrooms</span>
                    </div>

                    <div>
                        <strong>
                            {listing.bathrooms}
                        </strong>
                        <span>Bathrooms</span>
                    </div>

                    <div>
                        <strong>
                            {daysOnMarket}
                        </strong>
                        <span>
                            {daysOnMarket === 1
                                ? "Day"
                                : "Days"}{" "}
                            on Market
                        </span>
                    </div>

                </div>


                {/* ==========================================
                    DESCRIPTION
                ========================================== */}

                {listing.description && (
                    <div className="listing-description">

                        <h3>
                            About this property
                        </h3>

                        <p>
                            {listing.description}
                        </p>

                    </div>
                )}


                {/* ==========================================
                    LISTING AGENT
                ========================================== */}

                <div className="contact-box">

                    <h3>
                        Interested in this property?
                    </h3>

                    {listing.owner ? (
                        <>

                            {listing.owner.headshot && (
                                <img
                                    src={
                                        listing.owner
                                            .headshot
                                    }
                                    alt={
                                        listing.owner
                                            .name
                                    }
                                    className="agent-headshot"
                                />
                            )}

                            <p className="listed-by">

                                Listed by{" "}

                                <strong>
                                    {listing.owner
                                        .brokerage ||
                                        listing.owner
                                            .name}
                                </strong>

                            </p>

                            {listing.owner.name && (
                                <p>
                                    {
                                        listing.owner
                                            .name
                                    }
                                </p>
                            )}

                            {listing.owner.phone && (
                                <p>
                                    {
                                        listing.owner
                                            .phone
                                    }
                                </p>
                            )}

                            {listing.owner.email && (
                                <p>
                                    {
                                        listing.owner
                                            .email
                                    }
                                </p>
                            )}

                        </>
                    ) : (
                        <p>
                            Contact the listing agent
                            for more information.
                        </p>
                    )}

                    <button
                        type="button"
                        className="schedule-button"
                    >
                        Schedule a Showing
                    </button>

                </div>


                {/* ==========================================
                    LISTING META
                ========================================== */}

                <div className="listing-meta">

                    {formattedDate && (
                        <p>
                            Listed{" "}
                            {formattedDate}
                        </p>
                    )}

                    <p>
                        {daysOnMarket}{" "}
                        {daysOnMarket === 1
                            ? "day"
                            : "days"}{" "}
                        on market
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ListingDetails;