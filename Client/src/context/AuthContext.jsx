import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check whether user is already logged in
  const getCurrentUser = async () => {
    try {
      const response = await api.get("/api/auth/me");

      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  // Register
  const register = async (email, password) => {
    const response = await api.post(
      "/api/auth/register",
      {
        email,
        password,
      }
    );

    setUser(response.data.user);

    return response.data;
  };

  // Login
  const login = async (email, password) => {
    const response = await api.post(
      "/api/auth/login",
      {
        email,
        password,
      }
    );

    setUser(response.data.user);

    return response.data;
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};