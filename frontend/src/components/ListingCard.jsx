import { Link } from "react-router-dom";
import "./ListingCard.css";

function ListingCard({ listing }) {

    const listingHeading =
        listing.listingType === "For Rent"
            ? "Rental"
            : listing.propertyType;

    const agentName =
        listing.owner?.name || "";

    const brokerage =
        listing.owner?.brokerage || "";

    const image =
        listing.images?.[0] || "";

    return (
        <Link
            to={`/listings/${listing._id}`}
            className="listing-link"
        >
            <div className="card">

                {image ? (
                    <img
                        src={image}
                        alt={`${listingHeading} in ${listing.neighborhood}`}
                    />
                ) : (
                    <div className="listing-image-placeholder">
                        No Image Available
                    </div>
                )}

                <h2>
                    {listingHeading} in {listing.neighborhood}
                </h2>

                <p className="price">
                    ${Number(listing.price).toLocaleString()}
                    {listing.listingType === "For Rent" && "/month"}
                </p>

                <p>
                    {listing.address}
                    {listing.apartmentNumber &&
                        ` ${listing.apartmentNumber}`}
                </p>

                <p>
                    {listing.bedrooms} Bed • {listing.bathrooms} Bath
                </p>

                {brokerage && (
                    <p className="listing-agent">
                        Listed by {brokerage}
                    </p>
                )}

                {!brokerage && agentName && (
                    <p className="listing-agent">
                        Listed by {agentName}
                    </p>
                )}

            </div>
        </Link>
    );
}

export default ListingCard;