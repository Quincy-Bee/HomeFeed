import { Link } from "react-router-dom";
import "./NYCNeighborhoods.css";

const boroughs = [
  {
    name: "Manhattan",
    slug: "manhattan",
    description:
      "Iconic neighborhoods, world-class culture, and some of New York's most recognizable streets.",
    neighborhoods:
      "Upper East Side, Chelsea, Harlem, SoHo, Tribeca",
    image:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Brooklyn",
    slug: "brooklyn",
    description:
      "Brownstones, tree-lined streets, waterfront neighborhoods, and a culture all its own.",
    neighborhoods:
      "Williamsburg, Bedford-Stuyvesant, Crown Heights, Park Slope, Brooklyn Heights",
    image:
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Queens",
    slug: "queens",
    description:
      "One of the city's most diverse boroughs, with everything from quiet residential streets to a growing waterfront.",
    neighborhoods:
      "Astoria, Long Island City, Forest Hills, Flushing, Jackson Heights",
    image:
      "https://images.unsplash.com/photo-1522482178516-7a04ae0dce7a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "The Bronx",
    slug: "bronx",
    description:
      "Rich in history, culture, parks, and neighborhood communities across the northernmost borough.",
    neighborhoods:
      "Riverdale, Belmont, Mott Haven, Fordham, Kingsbridge",
    image:
      "https://images.unsplash.com/photo-1511745235279-2f7276d5ba65?q=80&w=1726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Staten Island",
    slug: "staten-island",
    description:
      "A quieter side of New York with waterfront views, more space, and a suburban feel.",
    neighborhoods:
      "St. George, Stapleton, Great Kills, New Dorp, Tottenville",
    image:
      "https://images.unsplash.com/photo-1694420489614-f7c9d4cf4a40?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function NYCNeighborhoods() {
  return (
    <main className="nyc-neighborhoods">
      <section className="nyc-neighborhoods-header">
        <p className="nyc-neighborhoods-eyebrow">Explore New York</p>

        <h1>NYC Neighborhoods</h1>

        <p className="nyc-neighborhoods-intro">
          Explore New York City by borough and discover the neighborhoods
          that could be your next home.
        </p>
      </section>

      <section className="borough-grid">
        {boroughs.map((borough) => (
          <Link
            key={borough.slug}
            to={`/nyc-neighborhoods/${borough.slug}`}
            className={`borough-card borough-card-${borough.slug}`}
          >
            <img
              src={borough.image}
              alt={`${borough.name} New York City`}
            />

            <div className="borough-card-overlay"></div>

            <div className="borough-card-content">
              <p className="borough-card-eyebrow">New York City</p>

              <h2>{borough.name}</h2>

              <p className="borough-card-description">
                {borough.description}
              </p>

              <p className="borough-card-neighborhoods">
                {borough.neighborhoods}
              </p>

              <span className="borough-card-link">
                Explore Neighborhoods →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default NYCNeighborhoods;