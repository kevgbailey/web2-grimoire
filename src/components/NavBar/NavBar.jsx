import "./NavBar.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const NavBar = () => {
  const logoPath = new URL("../../assets/logo.png", import.meta.url).href;
  return (
    <nav className="side-nav d-flex justify-content-between">
      <Link
        to="/"
        className="d-flex flex-row justify-content-center align-items-center p-4 text-decoration-none"
      >
        <img src={logoPath} alt="Logo" />
        <Header text="Grimoire Assistant" className="title"/>
      </Link>
      <ul className="d-flex flex-row justify-content-center align-items-center p-4 gap-5 mb-0 pr-5">
        <li className="nav-item">
          <Link to="/" className="text-decoration-none">
            <Header text="Home" className="title"/>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="text-decoration-none pr-4">
            <Header text="About" className="title"/>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="text-decoration-none pr-4">
            <Header text="Login" className="title"/>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;