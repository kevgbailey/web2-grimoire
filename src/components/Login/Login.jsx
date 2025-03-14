import { useState, useContext } from 'react';
import  { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Input from '../Input/Input';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with', { username, password });
    const loginSuccess = login(username, password);
    if (loginSuccess) {
      console.log('Login successful');
      navigate('/');
    } else {
      console.log('Login failed');
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
      </div>
    </div>
  );
};

export default Login;
