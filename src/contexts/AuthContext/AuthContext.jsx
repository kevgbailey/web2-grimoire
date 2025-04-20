import { createContext } from "react";
import PropTypes from "prop-types";
import { useAuth } from "@hooks/useUser";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  const login = async (credentials) => {
    await auth.login(credentials);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        token: auth.token,
        username: auth.username,
        userId: auth.userId,
        login: login,
        logout: auth.logout,
        register: auth.register,
        error: auth.error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;