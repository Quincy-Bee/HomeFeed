
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./CreateListings.css";

const neighborhoods = {
    Manhattan: [
        "Battery Park City", "Chelsea", "Chinatown", "East Harlem",
        "East Village", "Financial District", "Flatiron", "Gramercy",
        "Greenwich Village", "Harlem", "Hudson Square", "Inwood",
        "Kips Bay", "Lenox Hill", "Little Italy", "Lower East Side",
        "Midtown", "Morningside Heights", "Murray Hill", "NoHo",
        "Nolita", "SoHo", "Stuyvesant Town", "Tribeca",
        "Upper East Side", "Upper West Side", "Washington Heights",
        "West Village", "Yorkville"
    ],
    Brooklyn: [
        "Bedford-Stuyvesant", "Bensonhurst", "Boerum Hill",
        "Borough Park", "Brighton Beach", "Brooklyn Heights",
        "Clinton Hill", "Cobble Hill", "Coney Island", "Crown Heights",
        "DUMBO", "Ditmas Park", "Downtown Brooklyn", "East Flatbush",
        "Flatbush", "Fort Greene", "Gowanus", "Greenpoint",
        "Kensington", "Park Slope", "Prospect Heights", "Red Hook",
        "Sunset Park", "Williamsburg", "Windsor Terrace",
        "Weeksville", "Ocean Hill"
    ],
    Queens: [
        "Astoria", "Bayside", "Corona", "Elmhurst", "Flushing",
        "Forest Hills", "Fresh Meadows", "Jackson Heights", "Jamaica",
        "Long Island City", "Maspeth", "Middle Village", "Ridgewood",
        "Sunnyside", "Woodhaven", "Woodside"
    ],
    Bronx: [
        "Bedford Park", "Belmont", "Castle Hill", "Claremont",
        "Concourse", "Fordham", "Kingsbridge", "Morris Heights",
        "Morris Park", "Morrisania", "Norwood", "Parkchester",
        "Pelham Bay", "Riverdale", "Soundview", "Throgs Neck",
        "University Heights", "Wakefield", "West Farms", "Woodlawn"
    ],
    "Staten Island": [
        "Annadale", "Arden Heights", "Castleton Corners", "Clifton",
        "Eltingville", "Great Kills", "Graniteville", "Grasmere",
        "Huguenot", "New Dorp", "New Springville", "Oakwood",
        "Pleasant Plains", "Port Richmond", "Rosebank", "St. George",
        "Tottenville", "West Brighton"
    ]
};

const MAX_IMAGES = 15;

function CreateListing() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

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
        city: "Brooklyn",
        state: "NY",
        zipCode: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
        images: [""]
    });

    const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "borough") {
            setListing((current) => ({
                ...current,
                borough: value,
                neighborhood: "",
                city: value === "Manhattan" ? "New York" : value
            }));
            return;
        }

        setListing((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleImageChange = (index, value) => {
        setListing((current) => {
            const updatedImages = [...current.images];
            updatedImages[index] = value;

            return {
                ...current,
                images: updatedImages
            };
        });

        setImageErrors((current) => ({
            ...current,
            [index]: false
        }));
    };

    const addImageField = () => {
        if (listing.images.length >= MAX_IMAGES) return;

        setListing((current) => ({
            ...current,
            images: [...current.images, ""]
        }));
    };

    const removeImageField = (index) => {
        setListing((current) => {
            const updatedImages = current.images.filter(
                (_, i) => i !== index
            );

            return {
                ...current,
                images: updatedImages.length ? updatedImages : [""]
            };
        });

        setImageErrors((current) => {
            const updated = {};

            Object.entries(current).forEach(([key, value]) => {
                const oldIndex = Number(key);

                if (oldIndex < index) updated[oldIndex] = value;
                if (oldIndex > index) updated[oldIndex - 1] = value;
            });

            return updated;
        });

        setPrimaryImageIndex((current) => {
            if (current === index) return 0;
            if (current > index) return current - 1;
            return current;
        });
    };

    const createListing = async (event) => {
        event.preventDefault();
        setFormError("");

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const imageEntries = listing.images
            .map((url, index) => ({
                url: url.trim(),
                index
            }))
            .filter((image) => image.url !== "");

        if (imageEntries.length > MAX_IMAGES) {
            setFormError("You can add up to 15 photos.");
            return;
        }

        const invalidImage = imageEntries.some(
            (image) => imageErrors[image.index]
        );

        if (invalidImage) {
            setFormError(
                "Please fix or remove images that could not load."
            );
            return;
        }

        const primaryImage = imageEntries.find(
            (image) => image.index === primaryImageIndex
        );

        const otherImages = imageEntries.filter(
            (image) => image.index !== primaryImageIndex
        );

        const cleanedImages = [
            ...(primaryImage ? [primaryImage.url] : []),
            ...otherImages.map((image) => image.url)
        ];

        setSubmitting(true);

        try {
            const listingData = {
                ...listing,
                price: Number(listing.price),
                bedrooms: Number(listing.bedrooms),
                bathrooms: Number(listing.bathrooms),
                images: cleanedImages
            };

            const response = await fetch("/api/listings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(listingData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create listing."
                );
            }

            navigate("/dashboard");

        } catch (error) {
            console.error("Create listing error:", error);
            setFormError(error.message);

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="create-listing">

            <h1>Create Listing</h1>

            <form onSubmit={createListing}>

                <label>Listing Type</label>
                <select
                    name="listingType"
                    value={listing.listingType}
                    onChange={handleChange}
                >
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                </select>

                <label>Property Type</label>
                <select
                    name="propertyType"
                    value={listing.propertyType}
                    onChange={handleChange}
                >
                    <option value="Condo">Condo</option>
                    <option value="Co-op">Co-op</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Rental">Rental</option>
                </select>

                <label>Address</label>
                <input
                    name="address"
                    placeholder="Street Address"
                    value={listing.address}
                    onChange={handleChange}
                    required
                />

                <label>Apartment Number</label>
                <input
                    name="apartmentNumber"
                    placeholder="Apartment / Unit"
                    value={listing.apartmentNumber}
                    onChange={handleChange}
                />

                <label>Borough</label>
                <select
                    name="borough"
                    value={listing.borough}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Borough</option>
                    {Object.keys(neighborhoods).map((borough) => (
                        <option key={borough} value={borough}>
                            {borough}
                        </option>
                    ))}
                </select>

                <label>Neighborhood</label>
                <select
                    name="neighborhood"
                    value={listing.neighborhood}
                    onChange={handleChange}
                    required
                    disabled={!listing.borough}
                >
                    <option value="">Select Neighborhood</option>
                    {listing.borough &&
                        neighborhoods[listing.borough]?.map((neighborhood) => (
                            <option key={neighborhood} value={neighborhood}>
                                {neighborhood}
                            </option>
                        ))}
                </select>

                <label>City</label>
                <input
                    name="city"
                    value={listing.city}
                    onChange={handleChange}
                    required
                />

                <label>State</label>
                <input
                    name="state"
                    value={listing.state}
                    onChange={handleChange}
                    required
                />

                <label>ZIP Code</label>
                <input
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={listing.zipCode}
                    onChange={handleChange}
                    required
                />

                <label>
                    {listing.listingType === "For Rent"
                        ? "Monthly Rent"
                        : "Sale Price"}
                </label>
                <input
                    name="price"
                    type="number"
                    min="0"
                    placeholder="Enter Price"
                    value={listing.price}
                    onChange={handleChange}
                    required
                />

                <label>Bedrooms</label>
                <input
                    name="bedrooms"
                    type="number"
                    min="0"
                    placeholder="Bedrooms"
                    value={listing.bedrooms}
                    onChange={handleChange}
                    required
                />

                <label>Bathrooms</label>
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

                <label>Description</label>
                <textarea
                    name="description"
                    placeholder="Describe the property..."
                    value={listing.description}
                    onChange={handleChange}
                    rows="6"
                />

                {/* PROPERTY PHOTOS */}

                <div className="listing-images-section">

                    <div className="image-section-heading">
                        <h3>Property Photos</h3>
                        <p>
                            Add up to 15 photos. Paste a direct
                            image URL to display each photo.
                        </p>
                    </div>

                    {listing.images.map((image, index) => (
                        <div className="listing-image-card" key={index}>

                            <div className="listing-image-header">
                                <strong>Photo {index + 1}</strong>

                                {primaryImageIndex === index && image.trim() && (
                                    <span className="primary-image-badge">
                                        Primary Photo
                                    </span>
                                )}
                            </div>

                            <input
                                type="url"
                                placeholder="https://example.com/photo.jpg"
                                value={image}
                                onChange={(event) =>
                                    handleImageChange(index, event.target.value)
                                }
                            />

                            {image.trim() && (
                                <div className="listing-image-preview">
                                    <img
                                        src={image}
                                        alt={`Property preview ${index + 1}`}
                                        onError={() =>
                                            setImageErrors((current) => ({
                                                ...current,
                                                [index]: true
                                            }))
                                        }
                                        onLoad={() =>
                                            setImageErrors((current) => ({
                                                ...current,
                                                [index]: false
                                            }))
                                        }
                                        style={{
                                            display: imageErrors[index]
                                                ? "none"
                                                : "block"
                                        }}
                                    />

                                    {imageErrors[index] && (
                                        <div className="image-load-error">
                                            Unable to load this image.
                                            Check your URL.
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="listing-image-actions">

                                <button
                                    type="button"
                                    disabled={!image.trim() || imageErrors[index]}
                                    onClick={() => setPrimaryImageIndex(index)}
                                >
                                    {primaryImageIndex === index
                                        ? "Primary Photo"
                                        : "Make Primary"}
                                </button>

                                <button
                                    type="button"
                                    className="remove-image-button"
                                    onClick={() => removeImageField(index)}
                                >
                                    Remove
                                </button>

                            </div>

                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addImageField}
                        disabled={listing.images.length >= MAX_IMAGES}
                        className="add-image-button"
                    >
                        + Add Another Photo
                    </button>

                    <p className="image-count">
                        {listing.images.filter((image) => image.trim()).length}
                        {" / 15 photos added"}
                    </p>

                </div>

                {formError && (
                    <p className="form-error">{formError}</p>
                )}

                <button type="submit" disabled={submitting}>
                    {submitting
                        ? "Creating Listing..."
                        : listing.listingType === "For Rent"
                            ? "Create Rental Listing"
                            : "Create For Sale Listing"}
                </button>

            </form>
        </div>
    );
}

export default CreateListing;
