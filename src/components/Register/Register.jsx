import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Input from "../Input/Input";
import "./Register.css";

const Register = () => {
  const { register, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register({ username, password });
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="login-root">
      <Header text="Register" className="login-header" />
      <div className="login-form">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Button text="Register" className="login-button" onClick={handleRegister} />
        {error && <div className="error-message">{error}</div>}
        <div className="register-link">
          <Link to="/login" className="text-decoration-none">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
