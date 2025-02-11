import './About.css';
import Header from "../Header/Header";

const About = () => {
  return (
    <div className="about-container">
      <Header text="About" />
      <h1>About Grimoire Assistant</h1>
      <p>
        Welcome to Grimoire Assistant, your ultimate companion for managing and organizing your game sessions. Our application is designed to help you streamline the setup process, manage player roles, and ensure a smooth and enjoyable gaming experience.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Easy setup for game sessions</li>
        <li>Customizable player roles</li>
        <li>Intuitive user interface</li>
        <li>Real-time updates and notifications</li>
        <li>Comprehensive game management tools</li>
      </ul>
      <h2>Our Mission</h2>
      <p>
        Our mission is to enhance your gaming experience by providing a powerful and user-friendly tool that simplifies game management. We believe that with the right tools, you can focus more on enjoying the game and less on the logistics.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions, feedback, or suggestions, feel free to reach out to us at <a href="mailto:support@grimoireassistant.com">support@grimoireassistant.com</a>. We are always here to help and improve our application based on your needs.
      </p>
    </div>
  );
};

export default About;
