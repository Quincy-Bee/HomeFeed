import "./Brooklyn.css";

function Brooklyn() {
    return (
        <main className="brooklyn-page">

            <section className="neighborhood-info">

                <div className="neighborhood-header">
                    <p className="neighborhood-eyebrow">New York City</p>

                    <h1>Brooklyn</h1>

                    <p className="neighborhood-intro">
                        Brooklyn is one of New York City's most diverse boroughs,
                        known for its distinct neighborhoods, historic architecture,
                        creative culture, waterfront parks, and vibrant community.
                    </p>
                </div>

                <div className="neighborhood-image">
                    <img
                        src="https://images.unsplash.com/photo-1573261658953-8b29e144d1af?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Brooklyn New York City skyline"
                    />
                </div>

                <div className="neighborhood-content">

                    <section>
                        <h2>Life in Brooklyn</h2>

                        <p>
                            Brooklyn offers a wide range of lifestyles, from quiet
                            residential streets and historic brownstone blocks to
                            lively commercial corridors and waterfront neighborhoods.
                            Each area has its own personality, architecture, and sense
                            of community.
                        </p>

                        <p>
                            Residents have access to restaurants, cafes, parks,
                            cultural attractions, shopping, nightlife, and convenient
                            transportation into Manhattan and throughout the borough.
                            Brooklyn's combination of city energy and neighborhood
                            character makes it a popular choice for people looking
                            for a different pace from Manhattan.
                        </p>
                    </section>

                    <section>
                        <h2>Neighborhoods to Explore</h2>

                        <p>
                            Brooklyn is made up of dozens of distinct neighborhoods.
                            Explore areas such as Williamsburg, Greenpoint, Bushwick,
                            Bedford-Stuyvesant, Clinton Hill, Fort Greene, Park Slope,
                            Carroll Gardens, Cobble Hill, Boerum Hill, Brooklyn Heights,
                            Prospect Lefferts Gardens, Crown Heights, and DUMBO.
                        </p>
                    </section>

                    <section>
                        <h2>Brooklyn Real Estate</h2>

                        <p>
                            Brooklyn offers a diverse real estate market, including
                            brownstones, townhouses, condos, co-ops, multifamily
                            properties, lofts, and rental apartments. Buyers and renters
                            can find everything from historic pre-war buildings and
                            classic row houses to newly developed luxury residences.
                        </p>

                        <p>
                            Prices and property types can vary significantly from one
                            neighborhood to another, giving buyers and renters a wide
                            range of options depending on their lifestyle, budget, and
                            location preferences.
                        </p>
                    </section>

                </div>

            </section>

        </main>
    );
}

export default Brooklyn;