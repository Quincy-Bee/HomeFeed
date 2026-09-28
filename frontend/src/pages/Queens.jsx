import "./Queens.css";

function Queens() {
    return (
        <main className="queens-page">

            <section className="neighborhood-info">

                <div className="neighborhood-header">
                    <p className="neighborhood-eyebrow">New York City</p>

                    <h1>Queens</h1>

                    <p className="neighborhood-intro">
                        Queens is New York City's most diverse borough, known for
                        its vibrant communities, international culture, parks,
                        waterfront neighborhoods, and wide range of housing.
                    </p>
                </div>

                <div className="neighborhood-image">
                    <img
                        src="https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=1600&auto=format&fit=crop&q=80"
                        alt="Queens New York City"
                    />
                </div>

                <div className="neighborhood-content">

                    <section>
                        <h2>Life in Queens</h2>

                        <p>
                            Queens offers a unique combination of city energy and
                            residential living. Its neighborhoods range from
                            lively commercial streets and cultural destinations
                            to quiet tree-lined blocks and waterfront communities.
                        </p>

                        <p>
                            The borough is home to an incredible mix of restaurants,
                            markets, parks, museums, and entertainment. With
                            convenient subway, bus, and commuter rail connections,
                            Queens also provides easy access to Manhattan and other
                            parts of New York City.
                        </p>
                    </section>

                    <section>
                        <h2>Neighborhoods to Explore</h2>

                        <p>
                            Queens is made up of dozens of distinct neighborhoods.
                            Explore areas such as Astoria, Long Island City,
                            Sunnyside, Jackson Heights, Forest Hills, Flushing,
                            Ridgewood, Elmhurst, Kew Gardens, Bayside, and
                            Jamaica.
                        </p>
                    </section>

                    <section>
                        <h2>Queens Real Estate</h2>

                        <p>
                            Queens offers a broad mix of real estate, including
                            single-family homes, townhouses, condos, co-ops,
                            multifamily properties, and rental apartments.
                            Architecture and housing styles vary significantly
                            throughout the borough.
                        </p>

                        <p>
                            From modern waterfront developments in Long Island
                            City to historic homes in Forest Hills and residential
                            properties throughout eastern Queens, buyers and
                            renters can find a wide range of options based on
                            their lifestyle and location preferences.
                        </p>
                    </section>

                </div>

            </section>

        </main>
    );
}

export default Queens;