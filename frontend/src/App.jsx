import { useState, useEffect } from "react";
import "./App.css";

function App() {

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

  return (
    <div className="container">

      <h1>HomeFeed</h1>

      <div className="listings">

        {listings.map((listing) => (

          <div className="card" key={listing._id}>

            <h2>{listing.title}</h2>

            <p className="price">
              ${listing.price.toLocaleString()}
            </p>
            <p>{listing.address}</p>
            <p>{listing.bedrooms} Bed • {listing.bathrooms} Bath</p>
            <p>{listing.description}</p>
          </div>

        ))}

      </div>

    </div>
  );

}

export default App;