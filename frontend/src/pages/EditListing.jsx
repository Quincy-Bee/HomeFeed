import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        "Ocean Hill",
        "Park Slope",
        "Prospect Heights",
        "Red Hook",
        "Sunset Park",
        "Weeksville",
        "Williamsburg",
        "Windsor Terrace"
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


function EditListing() {

    const { id } = useParams();
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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);


    // =========================================
    // GET LISTING
    // =========================================

    useEffect(() => {

        const getListing = async () => {

            try {

                const response = await fetch(
                    `/api/listings/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to load listing"
                    );
                }

                setListing({
                    listingType:
                        data.listingType ||
                        "For Sale",

                    propertyType:
                        data.propertyType ||
                        "Condo",

                    address:
                        data.address ||
                        "",

                    apartmentNumber:
                        data.apartmentNumber ||
                        "",

                    borough:
                        data.borough ||
                        "",

                    neighborhood:
                        data.neighborhood ||
                        "",

                    city:
                        data.city ||
                        "New York City",

                    state:
                        data.state ||
                        "NY",

                    zipCode:
                        data.zipCode ||
                        "",

                    price:
                        data.price ??
                        "",

                    bedrooms:
                        data.bedrooms ??
                        "",

                    bathrooms:
                        data.bathrooms ??
                        "",

                    description:
                        data.description ||
                        "",

                    images:
                        data.images &&
                        data.images.length > 0
                            ? data.images
                            : [data.image || ""]
                });

            } catch (error) {

                console.error(
                    "Get listing error:",
                    error
                );

                setError(error.message);

            } finally {

                setLoading(false);

            }

        };

        getListing();

    }, [id]);


    // =========================================
    // HANDLE INPUT CHANGES
    // =========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setListing((currentListing) => ({
            ...currentListing,
            [name]: value
        }));


        if (name === "borough") {

            setListing((currentListing) => ({
                ...currentListing,
                borough: value,
                neighborhood: ""
            }));

        }

    };


    // =========================================
    // IMAGE CHANGES
    // =========================================

    const handleImageChange = (
        index,
        value
    ) => {

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


    // =========================================
    // ADD IMAGE
    // =========================================

    const addImageField = () => {

        setListing((currentListing) => ({
            ...currentListing,
            images: [
                ...currentListing.images,
                ""
            ]
        }));

    };


    // =========================================
    // REMOVE IMAGE
    // =========================================

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


    // =========================================
    // UPDATE LISTING
    // =========================================

    const updateListing = async (event) => {

        event.preventDefault();

        const token =
            localStorage.getItem("token");

        if (!token) {

            setError(
                "You must be logged in to edit a listing."
            );

            return;

        }

        setSaving(true);
        setError("");


        const cleanedImages =
            listing.images.filter(
                (image) =>
                    image.trim() !== ""
            );


        const listingData = {
            ...listing,
            price: Number(listing.price),
            bedrooms: Number(listing.bedrooms),
            bathrooms: Number(listing.bathrooms),
            images: cleanedImages
        };


        try {

            const response = await fetch(
                `/api/listings/${id}`,
                {
                    method: "PUT",

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
                    "Failed to update listing"
                );

            }


            console.log(
                "Updated listing:",
                data
            );


            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Update error:",
                error
            );

            setError(error.message);

        } finally {

            setSaving(false);

        }

    };


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (
            <div className="create-listing">

                <div className="create-listing-header">

                    <h1>
                        Edit Listing
                    </h1>

                    <p>
                        Loading listing...
                    </p>

                </div>

            </div>
        );

    }


    // =========================================
    // PAGE
    // =========================================

    return (

        <div className="create-listing">


            {/* HEADER */}

            <div className="create-listing-header">

                <h1>
                    Edit Listing
                </h1>

                <p>
                    Update the property details below.
                </p>

            </div>


            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}


            <form
                className="create-listing-form"
                onSubmit={updateListing}
            >


                {/* PROPERTY INFORMATION */}

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
                                value={listing.listingType}
                                onChange={handleChange}
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
                                value={listing.propertyType}
                                onChange={handleChange}
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


                {/* LOCATION */}

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
                            value={listing.address}
                            onChange={handleChange}
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
                                value={listing.borough}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Borough
                                </option>

                                {Object.keys(
                                    neighborhoods
                                ).map(
                                    (borough) => (
                                        <option
                                            key={borough}
                                            value={borough}
                                        >
                                            {borough}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                    </div>


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
                            onChange={handleChange}
                            required
                            disabled={
                                !listing.borough
                            }
                        >

                            <option value="">
                                Select Neighborhood
                            </option>

                            {listing.borough &&
                                neighborhoods[
                                    listing.borough
                                ].map(
                                    (neighborhood) => (
                                        <option
                                            key={
                                                neighborhood
                                            }
                                            value={
                                                neighborhood
                                            }
                                        >
                                            {neighborhood}
                                        </option>
                                    )
                                )}

                        </select>

                    </div>


                    <div className="form-row location-row">


                        <div className="form-group">

                            <label htmlFor="city">
                                City
                            </label>

                            <input
                                id="city"
                                type="text"
                                name="city"
                                value={listing.city}
                                readOnly
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="state">
                                State
                            </label>

                            <input
                                id="state"
                                type="text"
                                name="state"
                                value={listing.state}
                                readOnly
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="zipCode">
                                ZIP Code
                            </label>

                            <input
                                id="zipCode"
                                type="text"
                                name="zipCode"
                                value={listing.zipCode}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                </div>


                {/* PRICE & DETAILS */}

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
                                value={listing.price}
                                onChange={handleChange}
                                min="0"
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
                                value={listing.bedrooms}
                                onChange={handleChange}
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
                                value={listing.bathrooms}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                </div>


                {/* PHOTOS */}

                <div className="form-section">

                    <h2>
                        Photos
                    </h2>

                    <p>
                        Add image URLs for the property.
                    </p>


                    <div className="image-fields">

                        {listing.images.map(
                            (image, index) => (

                                <div
                                    className="image-field"
                                    key={index}
                                >

                                    <label>
                                        Photo {index + 1}
                                    </label>

                                    <input
                                        type="url"
                                        value={image}
                                        onChange={(
                                            event
                                        ) =>
                                            handleImageChange(
                                                index,
                                                event.target.value
                                            )
                                        }
                                        placeholder="https://example.com/photo.jpg"
                                    />


                                    {listing.images.length >
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
                                            Remove Photo
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


                {/* DESCRIPTION */}

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
                            required
                        />

                    </div>

                </div>


                {/* ACTIONS */}

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
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>

            </form>

        </div>

    );

}

export default EditListing;