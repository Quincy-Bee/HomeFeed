import "./TheBronx.css";

function TheBronx() {
    return (
        <main className="bronx-page">

            <section className="neighborhood-info">

                <div className="neighborhood-header">
                    <p className="neighborhood-eyebrow">New York City</p>

                    <h1>The Bronx</h1>

                    <p className="neighborhood-intro">
                        The Bronx is a vibrant New York City borough known for
                        its rich culture, historic neighborhoods, green spaces,
                        sports, and strong sense of community.
                    </p>
                </div>

                <div className="neighborhood-image">
                    <img
                        src="https://images.unsplash.com/photo-1559212418-345cc5936a9f?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="The Bronx, New York City"
                    />
                </div>

                <div className="neighborhood-content">

                    <section>
                        <h2>Life in The Bronx</h2>

                        <p>
                            The Bronx offers a mix of residential neighborhoods,
                            busy commercial corridors, cultural destinations,
                            parks, and waterfront areas. The borough has a
                            distinct identity shaped by generations of New York
                            City communities.
                        </p>

                        <p>
                            Residents have access to restaurants, local shops,
                            parks, museums, sports, and convenient transportation
                            throughout the borough and into Manhattan.
                        </p>
                    </section>

                    <section>
                        <h2>Neighborhoods to Explore</h2>

                        <p>
                            Explore neighborhoods such as Riverdale, Fordham,
                            Kingsbridge, Pelham Bay, Throggs Neck, Morris Park,
                            Belmont, Concourse, Mott Haven, and Hunts Point.
                        </p>
                    </section>

                    <section>
                        <h2>The Bronx Real Estate</h2>

                        <p>
                            The Bronx offers a diverse selection of real estate,
                            including single-family homes, townhouses, condos,
                            co-ops, multifamily properties, and rental apartments.
                        </p>

                        <p>
                            From waterfront properties and historic homes to
                            apartment buildings and newer developments, the
                            borough provides a variety of housing options across
                            its many neighborhoods.
                        </p>
                    </section>

                </div>

            </section>

        </main>
    );
}

export default TheBronx;