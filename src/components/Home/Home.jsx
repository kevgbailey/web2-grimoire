import Button from "../Button/Button";
import Header from "../Header/Header";
import Text from "../Text/Text";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  let welcomeText = "Welcome to the Grimoire! This website is not associated with the game Blood on the Clock Tower, and is only a helper to the game. Press the Play Button Below to begin.";
  const redirectToWebsite = () => {
    console.log("redirecting...");
    window.location.href = "https://bloodontheclocktower.com/buy";
  };
  return (
    <div className="home-root">
      <Header text="Home" className="home-header" />
      <Text text={welcomeText} className="home-text" />
      <Link to="/play">
        <Button
          text="Play"
          className="home-button"
          onClick={() => console.log("Play Button Clicked")}
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
