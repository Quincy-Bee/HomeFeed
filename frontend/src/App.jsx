import { useState, useEffect } from "react";

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
        <div>
            <h1>HomeFeed Listings</h1>

            {listings.map((listing) => (
                <div key={listing._id}>
                    <h2>{listing.title}</h2>
                    <p>${listing.price}</p>
                    <p>{listing.address}</p>
                    <p>{listing.description}</p>
                </div>
            ))}

        </div>
    );
}

export default App;