import { createContext, useState, useContext } from "react";
import { LoginRequest } from "./AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const { success, user } = await LoginRequest(username, password);
      if (success) setUser(user);
      else setUser(null);
      return success;
    } catch (error) {
      console.error("Erro de login:", error);
      setUser(null);
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);