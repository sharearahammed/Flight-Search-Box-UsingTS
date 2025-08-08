import { createContext, useContext, useState, ReactNode } from "react";
import { users } from "../../data/users";

type AuthContextType = {
  user: string | null;
  login: (username: string, password: string) => boolean; // returns success
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  // Updated login accepts username + password and returns boolean
  const login = (username: string, password: string): boolean => {
    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (validUser) {
      setUser(username);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
