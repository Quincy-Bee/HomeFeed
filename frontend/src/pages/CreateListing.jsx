import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./CreateListings.css";

const neighborhoods = {

    Manhattan: [
        "Battery Park City",
        "Chelsea",
        "Chinatown",
        "East Harlem",
        "East Village",
        "Financial District",
        "Flatiron",
        "Gramercy",
        "Greenwich Village",
        "Harlem",
        "Hudson Square",
        "Inwood",
        "Kips Bay",
        "Lenox Hill",
        "Little Italy",
        "Lower East Side",
        "Midtown",
        "Morningside Heights",
        "Murray Hill",
        "NoHo",
        "Nolita",
        "SoHo",
        "Stuyvesant Town",
        "Tribeca",
        "Upper East Side",
        "Upper West Side",
        "Washington Heights",
        "West Village",
        "Yorkville"
    ],

    Brooklyn: [
        "Bedford-Stuyvesant",
        "Bensonhurst",
        "Boerum Hill",
        "Borough Park",
        "Brighton Beach",
        "Brooklyn Heights",
        "Clinton Hill",
        "Cobble Hill",
        "Coney Island",
        "Crown Heights",
        "DUMBO",
        "Ditmas Park",
        "Downtown Brooklyn",
        "East Flatbush",
        "Fort Greene",
        "Gowanus",
        "Greenpoint",
        "Kensington",
        "Park Slope",
        "Prospect Heights",
        "Red Hook",
        "Sunset Park",
        "Williamsburg",
        "Windsor Terrace",
        "Weeksville",
        "Ocean Hill"
    ],

    Queens: [
        "Astoria",
        "Bayside",
        "Corona",
        "Elmhurst",
        "Flushing",
        "Forest Hills",
        "Fresh Meadows",
        "Jackson Heights",
        "Jamaica",
        "Long Island City",
        "Maspeth",
        "Middle Village",
        "Ridgewood",
        "Sunnyside",
        "Woodhaven",
        "Woodside"
    ],

    Bronx: [
        "Bedford Park",
        "Belmont",
        "Castle Hill",
        "Claremont",
        "Concourse",
        "Fordham",
        "Kingsbridge",
        "Morris Heights",
        "Morris Park",
        "Morrisania",
        "Norwood",
        "Parkchester",
        "Pelham Bay",
        "Riverdale",
        "Soundview",
        "Throgs Neck",
        "University Heights",
        "Wakefield",
        "West Farms",
        "Woodlawn"
    ],

    "Staten Island": [
        "Annadale",
        "Arden Heights",
        "Castleton Corners",
        "Clifton",
        "Eltingville",
        "Great Kills",
        "Graniteville",
        "Grasmere",
        "Huguenot",
        "New Dorp",
        "New Springville",
        "Oakwood",
        "Pleasant Plains",
        "Port Richmond",
        "Rosebank",
        "St. George",
        "Tottenville",
        "West Brighton"
    ]
};


function CreateListing() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    /*
     * The Dashboard buttons send:
     *
     * /dashboard/create?type=sale
     * /dashboard/create?type=rent
     *
     * This determines the initial listing type.
     */

    const initialType =
        searchParams.get("type") === "rent"
            ? "For Rent"
            : "For Sale";


    const [listing, setListing] = useState({

        listingType: initialType,

        propertyType: "Condo",

        address: "",

        apartmentNumber: "",

        borough: "",

        neighborhood: "",

        city: "New York City",

        state: "NY",

        zipCode: "",

        price: "",

        bedrooms: "",

        bathrooms: "",

        description: "",

        images: [""]
    });


    const [submitting, setSubmitting] = useState(false);


    // HANDLE FORM CHANGES
    const handleChange = (event) => {

        const { name, value } = event.target;


        if (name === "borough") {

            setListing((currentListing) => ({

                ...currentListing,

                borough: value,

                neighborhood: ""

            }));

            return;
        }


        setListing((currentListing) => ({

            ...currentListing,

            [name]: value

        }));
    };


    // HANDLE IMAGE CHANGE
    const handleImageChange = (index, value) => {

        setListing((currentListing) => {

            const updatedImages = [
                ...currentListing.images
            ];

            updatedImages[index] = value;


            return {

                ...currentListing,

                images: updatedImages

            };
        });
    };


    // ADD IMAGE FIELD
    const addImageField = () => {

        setListing((currentListing) => ({

            ...currentListing,

            images: [
                ...currentListing.images,
                ""
            ]

        }));
    };


    // REMOVE IMAGE FIELD
    const removeImageField = (index) => {

        setListing((currentListing) => {

            const updatedImages =
                currentListing.images.filter(
                    (_, imageIndex) =>
                        imageIndex !== index
                );


            return {

                ...currentListing,

                images:
                    updatedImages.length > 0
                        ? updatedImages
                        : [""]

            };

        });
    };


    // CREATE LISTING
    const createListing = async (event) => {

        event.preventDefault();


        const token =
            localStorage.getItem("token");


        if (!token) {

            console.log(
                "No authentication token found."
            );

            navigate("/login");

            return;
        }


        setSubmitting(true);


        try {

            const cleanedImages =
                listing.images.filter(
                    (image) =>
                        image.trim() !== ""
                );


            const listingData = {

                ...listing,

                price: Number(
                    listing.price
                ),

                bedrooms: Number(
                    listing.bedrooms
                ),

                bathrooms: Number(
                    listing.bathrooms
                ),

                images: cleanedImages
            };


            const response = await fetch(
                "/api/listings",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify(
                        listingData
                    )
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to create listing"
                );
            }


            console.log(
                "Created listing:",
                data
            );


            navigate("/dashboard");


        } catch (error) {

            console.error(
                "Create listing error:",
                error
            );

            alert(error.message);


        } finally {

            setSubmitting(false);

        }
    };


    return (

        <div className="create-listing">

            <h1>
                Create Listing
            </h1>


            <form
                onSubmit={createListing}
            >

                {/* LISTING TYPE */}

                <label>
                    Listing Type
                </label>

                <select
                    name="listingType"
                    value={listing.listingType}
                    onChange={handleChange}
                >

                    <option value="For Sale">
                        For Sale
                    </option>

                    <option value="For Rent">
                        For Rent
                    </option>

                </select>


                {/* PROPERTY TYPE */}

                <label>
                    Property Type
                </label>

                <select
                    name="propertyType"
                    value={listing.propertyType}
                    onChange={handleChange}
                >

                    <option value="Condo">
                        Condo
                    </option>

                    <option value="Co-op">
                        Co-op
                    </option>

                    <option value="Townhouse">
                        Townhouse
                    </option>

                    <option value="Rental">
                        Rental
                    </option>

                </select>


                {/* ADDRESS */}

                <label>
                    Address
                </label>

                <input
                    name="address"
                    placeholder="Street Address"
                    value={listing.address}
                    onChange={handleChange}
                    required
                />


                {/* APARTMENT */}

                <label>
                    Apartment Number
                </label>

                <input
                    name="apartmentNumber"
                    placeholder="Apartment / Unit"
                    value={
                        listing.apartmentNumber
                    }
                    onChange={handleChange}
                />


                {/* BOROUGH */}

                <label>
                    Borough
                </label>

                <select
                    name="borough"
                    value={listing.borough}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Borough
                    </option>

                    {Object.keys(
                        neighborhoods
                    ).map((borough) => (

                        <option
                            key={borough}
                            value={borough}
                        >
                            {borough}
                        </option>

                    ))}

                </select>


                {/* NEIGHBORHOOD */}

                <label>
                    Neighborhood
                </label>

                <select
                    name="neighborhood"
                    value={listing.neighborhood}
                    onChange={handleChange}
                    required
                    disabled={!listing.borough}
                >

                    <option value="">
                        Select Neighborhood
                    </option>

                    {listing.borough &&
                        neighborhoods[
                            listing.borough
                        ]?.map(
                            (neighborhood) => (

                                <option
                                    key={neighborhood}
                                    value={neighborhood}
                                >
                                    {neighborhood}
                                </option>

                            )
                        )}

                </select>


                {/* CITY */}

                <label>
                    City
                </label>

                <input
                    name="city"
                    value={listing.city}
                    onChange={handleChange}
                    required
                />


                {/* STATE */}

                <label>
                    State
                </label>

                <input
                    name="state"
                    value={listing.state}
                    onChange={handleChange}
                    required
                />


                {/* ZIP CODE */}

                <label>
                    ZIP Code
                </label>

                <input
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={listing.zipCode}
                    onChange={handleChange}
                    required
                />


                {/* PRICE */}

                <label>
                    {listing.listingType ===
                    "For Rent"
                        ? "Monthly Rent"
                        : "Price"}
                </label>

                <input
                    name="price"
                    type="number"
                    min="0"
                    placeholder={
                        listing.listingType ===
                        "For Rent"
                            ? "Monthly Rent"
                            : "Sale Price"
                    }
                    value={listing.price}
                    onChange={handleChange}
                    required
                />


                {/* BEDROOMS */}

                <label>
                    Bedrooms
                </label>

                <input
                    name="bedrooms"
                    type="number"
                    min="0"
                    placeholder="Bedrooms"
                    value={listing.bedrooms}
                    onChange={handleChange}
                    required
                />


                {/* BATHROOMS */}

                <label>
                    Bathrooms
                </label>

                <input
                    name="bathrooms"
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="Bathrooms"
                    value={listing.bathrooms}
                    onChange={handleChange}
                    required
                />


                {/* DESCRIPTION */}

                <label>
                    Description
                </label>

                <textarea
                    name="description"
                    placeholder="Describe the property..."
                    value={listing.description}
                    onChange={handleChange}
                    rows="6"
                />


                {/* IMAGES */}

                <label>
                    Listing Images
                </label>

                {listing.images.map(
                    (image, index) => (

                        <div
                            className="image-input-row"
                            key={index}
                        >

                            <input
                                type="url"
                                placeholder="Image URL"
                                value={image}
                                onChange={(event) =>
                                    handleImageChange(
                                        index,
                                        event.target.value
                                    )
                                }
                            />


                            {listing.images.length >
                                1 && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeImageField(
                                            index
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            )}

                        </div>

                    )
                )}


                <button
                    type="button"
                    onClick={addImageField}
                >
                    Add Another Image
                </button>


                {/* SUBMIT */}

                <button
                    type="submit"
                    disabled={submitting}
                >

                    {submitting
                        ? "Creating Listing..."
                        : listing.listingType ===
                          "For Rent"
                            ? "Create Rental Listing"
                            : "Create For Sale Listing"}

                </button>

            </form>

        </div>

    );
}

export default CreateListing;