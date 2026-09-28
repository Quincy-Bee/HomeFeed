import "./Manhattan.css";

function Manhattan() {
    return (
        <main className="manhattan-page">

            <section className="neighborhood-info">

                <div className="neighborhood-header">
                    <p className="neighborhood-eyebrow">New York City</p>

                    <h1>Manhattan</h1>

                    <p className="neighborhood-intro">
                        Manhattan is the heart of New York City, known for its
                        iconic skyline, historic neighborhoods, world-class
                        culture, and unmistakable energy.
                    </p>
                </div>

                <div className="neighborhood-image">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1714051660720-888e8454a021?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D"
                        alt="Manhattan New York City skyline"
                    />
                </div>

                <div className="neighborhood-content">

                    <section>
                        <h2>Life in Manhattan</h2>

                        <p>
                            Manhattan offers an incredible variety of ways to
                            experience New York. From the quiet, tree-lined
                            streets of the Upper East Side to the energy of
                            Downtown, each neighborhood has its own character,
                            architecture, and rhythm.
                        </p>

                        <p>
                            Residents have access to some of the city's best
                            restaurants, museums, parks, shopping, entertainment,
                            and transportation. Whether you're looking for the
                            excitement of Midtown or the neighborhood feel of
                            the West Village, Manhattan offers an unusually
                            diverse range of experiences within a relatively
                            small area.
                        </p>
                    </section>

                    <section>
                        <h2>Neighborhoods to Explore</h2>

                        <p>
                            Manhattan is made up of neighborhoods that can feel
                            like completely different worlds. Explore areas
                            such as the Upper East Side, Upper West Side,
                            Harlem, Chelsea, SoHo, Tribeca, Greenwich Village,
                            the West Village, the Lower East Side, and the
                            Financial District.
                        </p>
                    </section>

                    <section>
                        <h2>Manhattan Real Estate</h2>

                        <p>
                            The borough offers a broad mix of real estate,
                            including luxury condominiums, co-ops, townhouses,
                            lofts, and rental apartments. Architecture ranges
                            from historic pre-war buildings to modern
                            high-rises, giving buyers and renters a wide range
                            of options depending on their lifestyle and
                            location preferences.
                        </p>
                    </section>

                </div>

            </section>

        </main>
    );
}

export default Manhattan;