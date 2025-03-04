import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    if (storedToken) {
      storedToken = JSON.parse(storedToken);
      if (storedToken.expiration < Date.now()) {
        logout();
      } else {
        setIsAuthenticated(true);
        setToken(storedToken);
      }
    }
  }, []);

  const login = (username, password) => {
    const now = new Date();
    const expiration = now.setHours(now.getHours() + 1);
    const fakeToken = {
      username,
      password,
      expiration: expiration,
    };
    localStorage.setItem("token", JSON.stringify(fakeToken));
    setToken(fakeToken);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, setToken, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;