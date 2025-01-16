import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="side-nav">
      <div className="nav-header">
        <h2>Grimoire Assistant</h2>
      </div>
      <div className="nav-links">
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">Spells</Link>
                </li>
            </ul>
        </nav>
      </div>
      {/* Add your navigation items here */}
    </div>
  );
};

export default NavBar;
