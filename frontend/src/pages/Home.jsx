import { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";

function Home() {

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

  return (
    <div className="container">

      <h1>HomeFeed</h1>

      <div className="listings">

        {listings.map((listing) => (
          <ListingCard
            key={listing._id}
            listing={listing}
          />
        ))}

      </div>

    </div>
  );
}

export default Home;