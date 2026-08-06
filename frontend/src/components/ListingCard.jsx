import { Link } from "react-router-dom";
import "./ListingCard.css";

function ListingCard({ listing }) {

  return (

    <Link 
      to={`/listings/${listing._id}`} 
      className="listing-link"
    >

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

      </div>

    </Link>

  );
}

export default ListingCard;