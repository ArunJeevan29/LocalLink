import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // THE FIX: When the app loads, check the browser's hard drive first!
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("localLinkUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    // THE FIX: Save the user to the browser's hard drive so it survives a refresh
    localStorage.setItem("localLinkUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // THE FIX: Erase the memory from the hard drive when they log out
    localStorage.removeItem("localLinkUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
