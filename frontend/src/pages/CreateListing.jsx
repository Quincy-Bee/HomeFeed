import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        "Bushwick",
        "Carroll Gardens",
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
        "Jackson Heights",
        "Jamaica",
        "Long Island City",
        "Maspeth",
        "Middle Village",
        "Rego Park",
        "Ridgewood",
        "Sunnyside",
        "Woodside"
    ],

    Bronx: [
        "Bedford Park",
        "Belmont",
        "Concourse",
        "Fordham",
        "Highbridge",
        "Kingsbridge",
        "Morris Park",
        "Morrisania",
        "Mott Haven",
        "Riverdale",
        "Soundview",
        "Throgs Neck",
        "University Heights",
        "Wakefield",
        "Westchester Square"
    ],

    "Staten Island": [
        "Annadale",
        "Arden Heights",
        "Clifton",
        "Eltingville",
        "Great Kills",
        "Grasmere",
        "New Dorp",
        "New Springville",
        "Rosebank",
        "St. George",
        "Stapleton",
        "Tottenville"
    ]
};

function CreateListing() {

    const navigate = useNavigate();

    const [listing, setListing] = useState({
        listingType: "For Sale",
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


    // ==========================================
    // HANDLE FORM CHANGES
    // ==========================================

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


    // ==========================================
    // HANDLE IMAGE CHANGE
    // ==========================================

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


    // ==========================================
    // ADD IMAGE FIELD
    // ==========================================

    const addImageField = () => {

        setListing((currentListing) => ({
            ...currentListing,
            images: [
                ...currentListing.images,
                ""
            ]
        }));

    };


    // ==========================================
    // REMOVE IMAGE FIELD
    // ==========================================

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


    // ==========================================
    // CREATE LISTING
    // ==========================================

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

            // Remove empty image fields
            const cleanedImages =
                listing.images.filter(
                    (image) =>
                        image.trim() !== ""
                );

            const listingData = {
                ...listing,

                price:
                    Number(listing.price),

                bedrooms:
                    Number(listing.bedrooms),

                bathrooms:
                    Number(listing.bathrooms),

                images:
                    cleanedImages
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

                    body:
                        JSON.stringify(
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

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="create-listing-header">

                <h1>
                    Create Listing
                </h1>

                <p>
                    Add the property details below.
                </p>

            </div>


            <form
                className="create-listing-form"
                onSubmit={createListing}
            >


                {/* ==========================================
                    PROPERTY INFORMATION
                ========================================== */}

                <div className="form-section">

                    <h2>
                        Property Information
                    </h2>

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="listingType">
                                Listing Type
                            </label>

                            <select
                                id="listingType"
                                name="listingType"
                                value={
                                    listing.listingType
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="For Sale">
                                    For Sale
                                </option>

                                <option value="For Rent">
                                    For Rent
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label htmlFor="propertyType">
                                Property Type
                            </label>

                            <select
                                id="propertyType"
                                name="propertyType"
                                value={
                                    listing.propertyType
                                }
                                onChange={
                                    handleChange
                                }
                                required
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

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    LOCATION
                ========================================== */}

                <div className="form-section">

                    <h2>
                        Location
                    </h2>


                    <div className="form-group">

                        <label htmlFor="address">
                            Street Address
                        </label>

                        <input
                            id="address"
                            type="text"
                            name="address"
                            placeholder="527 Grand Avenue"
                            value={
                                listing.address
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="apartmentNumber">
                                Apartment / Unit
                            </label>

                            <input
                                id="apartmentNumber"
                                type="text"
                                name="apartmentNumber"
                                placeholder="#704"
                                value={
                                    listing.apartmentNumber
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="borough">
                                Borough
                            </label>

                            <select
                                id="borough"
                                name="borough"
                                value={
                                    listing.borough
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="">
                                    Select borough
                                </option>

                                <option value="Manhattan">
                                    Manhattan
                                </option>

                                <option value="Brooklyn">
                                    Brooklyn
                                </option>

                                <option value="Queens">
                                    Queens
                                </option>

                                <option value="Bronx">
                                    Bronx
                                </option>

                                <option value="Staten Island">
                                    Staten Island
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="neighborhood">
                                Neighborhood
                            </label>

                            <select
                                id="neighborhood"
                                name="neighborhood"
                                value={
                                    listing.neighborhood
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={
                                    !listing.borough
                                }
                                required
                            >

                                <option value="">

                                    {listing.borough
                                        ? "Select neighborhood"
                                        : "Select borough first"}

                                </option>


                                {listing.borough &&
                                    neighborhoods[
                                        listing.borough
                                    ]?.map(
                                        (
                                            neighborhood
                                        ) => (

                                            <option
                                                key={
                                                    neighborhood
                                                }
                                                value={
                                                    neighborhood
                                                }
                                            >
                                                {
                                                    neighborhood
                                                }
                                            </option>

                                        )
                                    )}

                            </select>

                        </div>


                        <div className="form-group">

                            <label htmlFor="city">
                                City
                            </label>

                            <select
                                id="city"
                                name="city"
                                value={
                                    listing.city
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="New York City">
                                    New York City
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="state">
                                State
                            </label>

                            <select
                                id="state"
                                name="state"
                                value={
                                    listing.state
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="NY">
                                    NY
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label htmlFor="zipCode">
                                ZIP Code
                            </label>

                            <input
                                id="zipCode"
                                type="text"
                                name="zipCode"
                                placeholder="11238"
                                value={
                                    listing.zipCode
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    PRICE & DETAILS
                ========================================== */}

                <div className="form-section">

                    <h2>
                        Price & Details
                    </h2>

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="price">
                                Price
                            </label>

                            <input
                                id="price"
                                type="number"
                                name="price"
                                min="0"
                                value={
                                    listing.price
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="bedrooms">
                                Bedrooms
                            </label>

                            <input
                                id="bedrooms"
                                type="number"
                                name="bedrooms"
                                min="0"
                                value={
                                    listing.bedrooms
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="bathrooms">
                                Bathrooms
                            </label>

                            <input
                                id="bathrooms"
                                type="number"
                                name="bathrooms"
                                min="0"
                                step="0.5"
                                value={
                                    listing.bathrooms
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    PHOTOS
                ========================================== */}

                <div className="form-section">

                    <h2>
                        Photos
                    </h2>

                    <p className="photo-instructions">
                        Add one or more property photo
                        URLs. The first photo will be
                        used as the main listing image.
                    </p>


                    <div className="image-fields">

                        {listing.images.map(
                            (image, index) => (

                                <div
                                    className="image-field"
                                    key={index}
                                >

                                    <div className="form-group">

                                        <label
                                            htmlFor={`image-${index}`}
                                        >
                                            Photo{" "}
                                            {index + 1}
                                        </label>

                                        <input
                                            id={`image-${index}`}
                                            type="url"
                                            value={
                                                image
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleImageChange(
                                                    index,
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="https://..."
                                            required={
                                                index ===
                                                    0
                                                    ? true
                                                    : false
                                            }
                                        />

                                    </div>


                                    {listing.images
                                        .length >
                                        1 && (

                                        <button
                                            type="button"
                                            className="remove-image-button"
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

                    </div>


                    <button
                        type="button"
                        className="add-image-button"
                        onClick={
                            addImageField
                        }
                    >
                        + Add Another Photo
                    </button>

                </div>


                {/* ==========================================
                    DESCRIPTION
                ========================================== */}

                <div className="form-section">

                    <h2>
                        Description
                    </h2>

                    <div className="form-group">

                        <label htmlFor="description">
                            Property Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={
                                listing.description
                            }
                            onChange={
                                handleChange
                            }
                            rows="7"
                            placeholder="Describe the property..."
                            required
                        />

                    </div>

                </div>


                {/* ==========================================
                    FORM ACTIONS
                ========================================== */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() =>
                            navigate(
                                "/dashboard"
                            )
                        }
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="publish-button"
                        disabled={
                            submitting
                        }
                    >
                        {submitting
                            ? "Publishing..."
                            : "Publish Listing"}
                    </button>

                </div>

            </form>

        </div>

    );
}

export default CreateListing;