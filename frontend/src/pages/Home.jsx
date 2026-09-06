import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import FSBO from "../components/FSBO";
import "./Home.css";

function Home() {

    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);

    const [search, setSearch] = useState({
        listingType: "For Sale",
        locations: [],
        minPrice: "",
        maxPrice: ""
    });

    const [hasSearched, setHasSearched] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);

    const locationRef = useRef(null);


    /* =========================================
       LOCATIONS
    ========================================= */

    const locations = {
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


    const boroughs = Object.keys(locations);


    /* =========================================
       PRICE OPTIONS
    ========================================= */

    const priceOptions = [
        500,
        1000,
        1500,
        2000,
        2500,
        3000,
        4000,
        5000,
        7500,
        10000,
        15000,
        20000,
        25000,
        50000,
        75000,
        100000,
        250000,
        500000,
        750000,
        1000000,
        1500000,
        2000000,
        2500000,
        3000000,
        4000000,
        5000000,
        7500000,
        10000000,
        15000000,
        20000000,
        25000000,
        30000000
    ];


    /* =========================================
       FETCH LISTINGS
    ========================================= */

    useEffect(() => {

        fetch("/api/listings")
            .then((response) => response.json())
            .then((data) => {
                setListings(data);
            })
            .catch((error) => {
                console.log(
                    "Error fetching listings:",
                    error
                );
            });

    }, []);


    /* =========================================
       CLOSE LOCATION DROPDOWN
       WHEN CLICKING OUTSIDE
    ========================================= */

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                locationRef.current &&
                !locationRef.current.contains(event.target)
            ) {
                setLocationOpen(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);


    /* =========================================
       FORMAT PRICE
    ========================================= */

    const formatPrice = (price) => {
        return `$${price.toLocaleString()}`;
    };


    /* =========================================
       LOCATION SELECTION
    ========================================= */

    const toggleLocation = (location) => {

        setSearch((currentSearch) => {

            const alreadySelected =
                currentSearch.locations.includes(
                    location
                );

            return {
                ...currentSearch,

                locations: alreadySelected
                    ? currentSearch.locations.filter(
                        (item) =>
                            item !== location
                    )
                    : [
                        ...currentSearch.locations,
                        location
                    ]
            };

        });

    };


    /* =========================================
       BOROUGH SELECTION
    ========================================= */

    const toggleBorough = (borough) => {

        setSearch((currentSearch) => {

            const boroughNeighborhoods =
                locations[borough];

            const allSelected =
                boroughNeighborhoods.every(
                    (neighborhood) =>
                        currentSearch.locations.includes(
                            neighborhood
                        )
                );

            if (allSelected) {

                return {
                    ...currentSearch,

                    locations:
                        currentSearch.locations.filter(
                            (location) =>
                                !boroughNeighborhoods.includes(
                                    location
                                )
                        )
                };

            }

            const newLocations = [
                ...currentSearch.locations
            ];

            boroughNeighborhoods.forEach(
                (neighborhood) => {

                    if (
                        !newLocations.includes(
                            neighborhood
                        )
                    ) {
                        newLocations.push(
                            neighborhood
                        );
                    }

                }
            );

            return {
                ...currentSearch,
                locations: newLocations
            };

        });

    };


    /* =========================================
       LOCATION LABEL
    ========================================= */

    const getLocationLabel = () => {

        if (search.locations.length === 0) {
            return "Any Location";
        }

        const selectedBoroughs =
            boroughs.filter((borough) =>
                locations[borough].every(
                    (neighborhood) =>
                        search.locations.includes(
                            neighborhood
                        )
                )
            );

        const individualLocations =
            search.locations.filter((location) =>
                !selectedBoroughs.some(
                    (borough) =>
                        locations[borough].includes(
                            location
                        )
                )
            );

        const labels = [
            ...selectedBoroughs.map(
                (borough) =>
                    `All of ${borough}`
            ),
            ...individualLocations
        ];

        if (labels.length <= 2) {
            return labels.join(", ");
        }

        return `${labels.length} locations selected`;

    };


    /* =========================================
       HANDLE SEARCH
    ========================================= */

    const handleSearch = (event) => {

        event.preventDefault();

        const results = listings.filter((listing) => {

            /* =========================================
               LISTING TYPE
            ========================================= */

            if (
                listing.listingType !==
                search.listingType
            ) {
                return false;
            }


            /* =========================================
               LOCATION
            ========================================= */

            if (search.locations.length > 0) {

                const listingNeighborhood =
                    (
                        listing.neighborhood || ""
                    ).toLowerCase();

                const listingBorough =
                    (
                        listing.borough || ""
                    ).toLowerCase();

                const listingAddress =
                    (
                        listing.address || ""
                    ).toLowerCase();

                const listingCity =
                    (
                        listing.city || ""
                    ).toLowerCase();

                const listingZip =
                    (
                        listing.zipCode || ""
                    ).toLowerCase();

                const matchesLocation =
                    search.locations.some(
                        (location) => {

                            const selectedLocation =
                                location.toLowerCase();

                            return (
                                listingNeighborhood ===
                                    selectedLocation ||

                                listingBorough ===
                                    selectedLocation ||

                                listingAddress.includes(
                                    selectedLocation
                                ) ||

                                listingCity ===
                                    selectedLocation ||

                                listingZip.includes(
                                    selectedLocation
                                )
                            );

                        }
                    );

                if (!matchesLocation) {
                    return false;
                }

            }


            /* =========================================
               MIN PRICE
            ========================================= */

            if (
                search.minPrice !== "" &&
                Number(listing.price) <
                    Number(search.minPrice)
            ) {
                return false;
            }


            /* =========================================
               MAX PRICE
            ========================================= */

            if (
                search.maxPrice !== "" &&
                Number(listing.price) >
                    Number(search.maxPrice)
            ) {
                return false;
            }


            return true;

        });


        setFilteredListings(results);
        setHasSearched(true);
        setLocationOpen(false);

    };


    /* =========================================
       QUICK SEARCH FROM FEATURE CARDS
    ========================================= */

    const handleQuickSearch = (listingType) => {

        setSearch((currentSearch) => ({
            ...currentSearch,
            listingType
        }));

        setHasSearched(false);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    return (

        <main className="home">

            {/* =========================================
                SEARCH HERO
            ========================================= */}

            <section className="search-hero">

                <div className="search-hero-content">

                    <p className="search-eyebrow">
                        HOMEFEED
                    </p>

                    <h1>
                        Find your next home.
                    </h1>


                    {/* =========================================
                        SEARCH BOX
                    ========================================= */}

                    <form
                        className="search-box"
                        onSubmit={handleSearch}
                    >

                        {/* =========================================
                            BUY / RENT
                        ========================================= */}

                        <div className="search-type">

                            <button
                                type="button"
                                className={
                                    search.listingType ===
                                    "For Sale"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setSearch({
                                        ...search,
                                        listingType:
                                            "For Sale"
                                    })
                                }
                            >
                                Buy
                            </button>


                            <button
                                type="button"
                                className={
                                    search.listingType ===
                                    "For Rent"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setSearch({
                                        ...search,
                                        listingType:
                                            "For Rent"
                                    })
                                }
                            >
                                Rent
                            </button>

                        </div>


                        {/* =========================================
                            LOCATION
                        ========================================= */}

                        <div
                            className="search-field location-field"
                            ref={locationRef}
                        >

                            <label>
                                Location
                            </label>


                            <button
                                type="button"
                                className="location-selector"
                                onClick={() =>
                                    setLocationOpen(
                                        !locationOpen
                                    )
                                }
                            >

                                <span>
                                    {getLocationLabel()}
                                </span>

                                <span className="location-arrow">
                                    ▾
                                </span>

                            </button>


                            {locationOpen && (

                                <div className="location-dropdown">

                                    <div className="location-dropdown-header">

                                        <span>
                                            Select locations
                                        </span>

                                        {search.locations.length >
                                            0 && (
                                            <button
                                                type="button"
                                                className="clear-locations"
                                                onClick={() =>
                                                    setSearch({
                                                        ...search,
                                                        locations:
                                                            []
                                                    })
                                                }
                                            >
                                                Clear
                                            </button>
                                        )}

                                    </div>


                                    {/* =========================================
                                        BOROUGHS
                                    ========================================= */}

                                    <div className="location-group">

                                        <div className="location-group-title">
                                            Boroughs
                                        </div>


                                        {boroughs.map(
                                            (borough) => {

                                                const allSelected =
                                                    locations[
                                                        borough
                                                    ].every(
                                                        (
                                                            neighborhood
                                                        ) =>
                                                            search.locations.includes(
                                                                neighborhood
                                                            )
                                                    );

                                                return (

                                                    <label
                                                        className="location-option borough-option"
                                                        key={
                                                            borough
                                                        }
                                                    >

                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                allSelected
                                                            }
                                                            onChange={() =>
                                                                toggleBorough(
                                                                    borough
                                                                )
                                                            }
                                                        />

                                                        <span>
                                                            All of{" "}
                                                            {
                                                                borough
                                                            }
                                                        </span>

                                                    </label>

                                                );

                                            }
                                        )}

                                    </div>


                                    {/* =========================================
                                        INDIVIDUAL NEIGHBORHOODS
                                    ========================================= */}

                                    {boroughs.map(
                                        (borough) => (

                                            <div
                                                className="location-group"
                                                key={
                                                    borough
                                                }
                                            >

                                                <div className="location-group-title">
                                                    {
                                                        borough
                                                    }
                                                </div>


                                                {locations[
                                                    borough
                                                ].map(
                                                    (
                                                        neighborhood
                                                    ) => (

                                                        <label
                                                            className="location-option"
                                                            key={
                                                                neighborhood
                                                            }
                                                        >

                                                            <input
                                                                type="checkbox"
                                                                checked={search.locations.includes(
                                                                    neighborhood
                                                                )}
                                                                onChange={() =>
                                                                    toggleLocation(
                                                                        neighborhood
                                                                    )
                                                                }
                                                            />

                                                            <span>
                                                                {
                                                                    neighborhood
                                                                }
                                                            </span>

                                                        </label>

                                                    )
                                                )}

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>


                        {/* =========================================
                            MIN PRICE
                        ========================================= */}

                        <div className="search-field">

                            <label>
                                Min Price
                            </label>

                            <select
                                name="minPrice"
                                value={
                                    search.minPrice
                                }
                                onChange={(event) =>
                                    setSearch({
                                        ...search,
                                        minPrice:
                                            event.target
                                                .value
                                    })
                                }
                            >

                                <option value="">
                                    No Min
                                </option>

                                {priceOptions.map(
                                    (price) => (

                                        <option
                                            key={price}
                                            value={price}
                                        >
                                            {
                                                formatPrice(
                                                    price
                                                )
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* =========================================
                            MAX PRICE
                        ========================================= */}

                        <div className="search-field">

                            <label>
                                Max Price
                            </label>

                            <select
                                name="maxPrice"
                                value={
                                    search.maxPrice
                                }
                                onChange={(event) =>
                                    setSearch({
                                        ...search,
                                        maxPrice:
                                            event.target
                                                .value
                                    })
                                }
                            >

                                <option value="">
                                    No Max
                                </option>

                                {priceOptions.map(
                                    (price) => (

                                        <option
                                            key={price}
                                            value={price}
                                        >
                                            {
                                                formatPrice(
                                                    price
                                                )
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* =========================================
                            SEARCH BUTTON
                        ========================================= */}

                        <button
                            type="submit"
                            className="search-button"
                        >
                            Search
                        </button>

                    </form>

                </div>

            </section>


            {/* =========================================
                FSBO
            ========================================= */}

            <FSBO />


            {/* =========================================
                HOMEFEED FEATURES
            ========================================= */}

            <section className="home-features">

                <div className="home-features-grid">

                    {/* =========================================
                        RENT
                    ========================================= */}

                    <div className="home-feature-card">

                        <div className="home-feature-content">

                            <p className="home-feature-eyebrow">
                                RENT
                            </p>

                            <h2>
                                Rent a NYC apartment
                            </h2>

                            <p>
                                Explore apartments across New York
                                City and narrow your search by
                                location, price, and the features
                                that matter most to you.
                            </p>

                            <button
                                type="button"
                                className="home-feature-link"
                                onClick={() =>
                                    handleQuickSearch(
                                        "For Rent"
                                    )
                                }
                            >
                                Search Rentals
                            </button>

                        </div>

                    </div>


                    {/* =========================================
                        BUY
                    ========================================= */}

                    <div className="home-feature-card">

                        <div className="home-feature-content">

                            <p className="home-feature-eyebrow">
                                BUY
                            </p>

                            <h2>
                                Buy with confidence
                            </h2>

                            <p>
                                Find your next home and explore
                                properties across NYC. Search by
                                neighborhood, price, and property
                                type to find the right fit.
                            </p>

                            <button
                                type="button"
                                className="home-feature-link"
                                onClick={() =>
                                    handleQuickSearch(
                                        "For Sale"
                                    )
                                }
                            >
                                Search Sales
                            </button>

                        </div>

                    </div>


                    {/* =========================================
                        SELL
                    ========================================= */}

                    <div className="home-feature-card">

                        <div className="home-feature-content">

                            <p className="home-feature-eyebrow">
                                SELL
                            </p>

                            <h2>
                                Sell your home successfully
                            </h2>

                            <p>
                                Ready to put your property on the
                                market? Create an account and list
                                your home on HomeFeed.
                            </p>

                            <Link
                                to="/register"
                                className="home-feature-link"
                            >
                                List Your Home
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                SEARCH RESULTS
            ========================================= */}

            {hasSearched && (

                <section className="search-results">

                    <div className="results-header">

                        <h2>
                            {filteredListings.length}{" "}
                            {
                                filteredListings.length ===
                                1
                                    ? "Listing"
                                    : "Listings"
                            }
                        </h2>

                    </div>


                    {filteredListings.length > 0 ? (

                        <div className="listings">

                            {filteredListings.map(
                                (listing) => (

                                    <ListingCard
                                        key={
                                            listing._id
                                        }
                                        listing={
                                            listing
                                        }
                                    />

                                )
                            )}

                        </div>

                    ) : (

                        <div className="no-results">

                            <h2>
                                No listings found
                            </h2>

                            <p>
                                Try adjusting your
                                search criteria.
                            </p>

                        </div>

                    )}

                </section>

            )}

        </main>

    );

}

export default Home;