import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditListing() {

  const { id } = useParams();

// Save the edited listing

  const [listing, setListing] = useState({
    title: "",
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    image: ""
  });


  useEffect(() => {

    fetch(`http://localhost:3000/api/listings/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setListing(data);
      });

  }, [id]);


  const handleChange = (event) => {

    setListing({
      ...listing,
      [event.target.name]: event.target.value
    });

  };

  const updateListing = (event) => {

  event.preventDefault();


  fetch(`http://localhost:3000/api/listings/${id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(listing)

  })

  .then((response) => response.json())

  .then((updatedListing) => {

    console.log("Updated:", updatedListing);

  })

  .catch((error) => {

    console.log("Update error:", error);

  });

};

  return (

    <div>

      <h1>Edit Listing</h1>


     <form onSubmit={updateListing}>

        <input
          name="title"
          value={listing.title}
          onChange={handleChange}
        />


        <input
          name="price"
          value={listing.price}
          onChange={handleChange}
        />


        <input
          name="address"
          value={listing.address}
          onChange={handleChange}
        />


        <input
          name="bedrooms"
          value={listing.bedrooms}
          onChange={handleChange}
        />


        <input
          name="bathrooms"
          value={listing.bathrooms}
          onChange={handleChange}
        />


        <input
          name="image"
          value={listing.image}
          onChange={handleChange}
        />


        <textarea
          name="description"
          value={listing.description}
          onChange={handleChange}
        />


        <button>
          Save Changes
        </button>


      </form>


    </div>

  );

}

export default EditListing;