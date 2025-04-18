import Button from "../Button/Button";
import Header from "../Header/Header";
import Text from "../Text/Text";
import "./Home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const Home = () => {
  const { isAuthenticated, username } = useContext(AuthContext);

  const welcomeMessage = isAuthenticated ? "Welcome, " + username + "!" : "Welcome to the Grimoire!";

  let welcomeText = "Welcome to the Grimoire! This website is not associated with the game Blood on the Clock Tower, and is only a helper to the game. Press the Play Button Below to begin.";
  const redirectToWebsite = () => {
    console.log("redirecting...");
    window.location.href = "https://bloodontheclocktower.com/buy";
  };
  return (
    <div className="home-root">
      <Header text={welcomeMessage} className="home-header" />
      <Text text={welcomeText} className="home-text" />
      <Link to="/play" className="text-decoration-none">
        <Button
          text="Play"
          className="home-button"
        />
      </Link>
      <Button
        text="Buy Blood on the Clock Tower"
        className="home-button"
        onClick={redirectToWebsite}
      />
    </div>
  );
};

export default Home;
