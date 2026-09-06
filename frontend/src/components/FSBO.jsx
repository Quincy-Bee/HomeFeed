import { Link } from "react-router-dom";
import "./FSBO.css";

function FSBO() {
  return (
    <section className="fsbo">
      <div className="fsbo-content">
        <h2>Want to rent or sell your home yourself?</h2>

        <div className="fsbo-links">
          <Link to="/register" className="fsbo-link">
            For Rent by Owner
          </Link>

          <Link to="/register" className="fsbo-link">
            For Sale by Owner
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FSBO;