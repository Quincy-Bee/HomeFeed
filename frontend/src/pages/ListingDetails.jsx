import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ListingDetails.css";

function ListingDetails() {

  const { id } = useParams();

  const [listing, setListing] = useState(null);

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then((response) => response.json())
      .then((data) => setListing(data))
      .catch((error) => console.log(error));
  }, [id]);


  if (!listing) {
    return <h2>Loading...</h2>;
  }


  return (
  <div className="listing-details">

    <img
      src={listing.image}
      alt={listing.title}
      className="listing-image"
    />

    <div className="listing-info">

      <h1>{listing.title}</h1>

      <h2>
        ${listing.price.toLocaleString()}
      </h2>

      <p>{listing.address}</p>

      <p>
        {listing.bedrooms} Bedrooms • {listing.bathrooms} Bathrooms
      </p>

      <p>
        {listing.description}
      </p>

<div className="contact-box">

  <h3>Interested in this property?</h3>

  <p>Contact QB Realty Group for more information.</p>

  <button>
    Schedule a Showing
  </button>

</div>

    </div>

  </div>

  );
}

export default ListingDetails;