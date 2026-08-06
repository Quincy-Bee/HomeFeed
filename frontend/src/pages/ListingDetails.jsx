import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ListingDetails.css";

function ListingDetails() {

  const { id } = useParams();

  const [listing, setListing] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/listings/${id}`)
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
      />

      <h1>{listing.title}</h1>

      <h2>${listing.price.toLocaleString()}</h2>

      <p>{listing.address}</p>

      <p>
        {listing.bedrooms} Bed • {listing.bathrooms} Bath
      </p>

      <p>{listing.description}</p>

    </div>
  );
}

export default ListingDetails;