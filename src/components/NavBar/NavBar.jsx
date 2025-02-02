import "./NavBar.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const NavBar = () => {
  return (
    <nav className="side-nav d-flex justify-content-between">
      <Link
        to="/"
        className="d-flex flex-row justify-content-center align-items-center p-4 text-decoration-none"
      >
        <img src="src/assets/logo.png" alt="Logo" />
        <Header text="Grimoire Assistant" />
      </Link>
      <ul className="d-flex flex-row justify-content-center align-items-center p-4 gap-5 mb-0 pr-5">
        <li className="nav-item">
          <Link to="/" className="text-decoration-none">
            <Header text="Home" />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="text-decoration-none pr-4">
            <Header text="About" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;