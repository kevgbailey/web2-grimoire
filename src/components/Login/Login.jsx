import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Input from "../Input/Input";
import "./Login.css";

const Login = () => {
  const { login, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log('Attempting login in Login.jsx with username:', username, 'and password:', password);
      await login({ username, password });
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  return (
    <div className="login-root">
      <Header text="Login" className="login-header" />
      <div className="login-form">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button text="Login" className="login-button" onClick={handleLogin} />
        {error && <div className="error-message">{error}</div>}
        <div className="register-link">
          <Link to="/register" className="text-decoration-none">
          <Header text="Don't have an account? Register here" className="title"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
