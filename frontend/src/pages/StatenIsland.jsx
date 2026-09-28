import "./StatenIsland.css";

function StatenIsland() {
    return (
        <main className="staten-island-page">

            <section className="neighborhood-info">

                <div className="neighborhood-header">
                    <p className="neighborhood-eyebrow">New York City</p>

                    <h1>Staten Island</h1>

                    <p className="neighborhood-intro">
                        Staten Island offers a quieter side of New York City,
                        known for its residential neighborhoods, waterfront views,
                        parks, historic communities, and suburban feel.
                    </p>
                </div>

                <div className="neighborhood-image">
                    <img
                        src="https://images.unsplash.com/photo-1566421739906-44b62aa33f9a?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0"
                        alt="Staten Island New York City"
                    />
                </div>

                <div className="neighborhood-content">

                    <section>
                        <h2>Life on Staten Island</h2>

                        <p>
                            Staten Island has a distinct residential character
                            compared with New York City's other boroughs. Its
                            neighborhoods feature tree-lined streets, single-family
                            homes, parks, waterfront communities, and local
                            commercial districts.
                        </p>

                        <p>
                            Residents enjoy access to beaches, parks, restaurants,
                            shopping, cultural attractions, and outdoor spaces.
                            The Staten Island Ferry also provides a direct connection
                            to Lower Manhattan while offering views of New York
                            Harbor and the skyline.
                        </p>
                    </section>

                    <section>
                        <h2>Neighborhoods to Explore</h2>

                        <p>
                            Explore areas such as St. George, Stapleton, Tompkinsville,
                            New Brighton, Clifton, Todt Hill, Great Kills, Tottenville,
                            West Brighton, and Annadale.
                        </p>
                    </section>

                    <section>
                        <h2>Staten Island Real Estate</h2>

                        <p>
                            Staten Island offers a diverse selection of real estate,
                            including single-family homes, townhouses, condos,
                            co-ops, multifamily properties, and rental apartments.
                        </p>

                        <p>
                            The borough is particularly known for its detached homes,
                            larger properties, and residential neighborhoods, while
                            areas closer to the North Shore offer more urban housing
                            options and convenient access to Manhattan.
                        </p>
                    </section>

                </div>

            </section>

        </main>
    );
}

export default StatenIsland;