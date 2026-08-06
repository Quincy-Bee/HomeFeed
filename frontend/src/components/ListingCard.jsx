import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <div className="card">

      <img 
        src={listing.image} 
        alt={listing.title}
      />

      <h2>{listing.title}</h2>

      <p className="price">
        ${listing.price.toLocaleString()}
      </p>

      <p>{listing.address}</p>

      <p>
        {listing.bedrooms} Bed • {listing.bathrooms} Bath
      </p>

      <p>
        {listing.description}
      </p>

      <Link to={`/listings/${listing._id}`}>
        View Details
      </Link>

    </div>
  );
}

export default ListingCard;