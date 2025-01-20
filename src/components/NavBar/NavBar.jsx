import "./NavBar.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const NavBar = () => {
  return (
    <div className="side-nav">
      <Link to="/" className="nav-name">
        <img src="../assets/logo.png" alt="Logo" />
        <Header text="Grimoire Assistant" />
      </Link>
      <div className="nav-links">
        <nav className="nav-items">
          <Link to="/">
            <Header text="Home" />
          </Link>
          <Link to="/about">
            <Header text="About" />
          </Link>
        </nav>
      </div>
      {/* Add your navigation items here */}
    </div>
  );
};

export default NavBar;
