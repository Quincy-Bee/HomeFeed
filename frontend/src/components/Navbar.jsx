import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        HomeFeed
      </Link>

      <div className="nav-links">

        <Link to="/">
          Listings
        </Link>

        <Link to="/create">
          Create Listing
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;