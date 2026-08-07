import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateListing() {

  const navigate = useNavigate();


  const [listing, setListing] = useState({

    title: "",
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    image: ""

  });



  const handleChange = (event) => {

    setListing({

      ...listing,

      [event.target.name]: event.target.value

    });

  };



  const createListing = (event) => {

    event.preventDefault();



    fetch("http://localhost:3000/api/listings", {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify(listing)

    })


      .then((response) => response.json())


      .then((newListing) => {

        console.log("Created listing:", newListing);


        navigate("/dashboard");

      })


      .catch((error) => {

        console.log("Create listing error:", error);

      });


  };



  return (

    <div className="create-listing">


      <h1>Create Listing</h1>



      <form onSubmit={createListing}>


        <input

          name="title"

          placeholder="Property Title"

          value={listing.title}

          onChange={handleChange}

        />



        <input

          name="price"

          placeholder="Price"

          value={listing.price}

          onChange={handleChange}

        />



        <input

          name="address"

          placeholder="Address"

          value={listing.address}

          onChange={handleChange}

        />



        <input

          name="bedrooms"

          placeholder="Bedrooms"

          value={listing.bedrooms}

          onChange={handleChange}

        />



        <input

          name="bathrooms"

          placeholder="Bathrooms"

          value={listing.bathrooms}

          onChange={handleChange}

        />



        <input

          name="image"

          placeholder="Image URL"

          value={listing.image}

          onChange={handleChange}

        />



        <textarea

          name="description"

          placeholder="Description"

          value={listing.description}

          onChange={handleChange}

        />



        <button type="submit">

          Create Listing

        </button>



      </form>


    </div>

  );

}


export default CreateListing;