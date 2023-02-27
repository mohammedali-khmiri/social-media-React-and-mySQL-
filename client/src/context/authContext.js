import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //initial state of currentUser stored in localStorage
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  //post all inputs coming from Login page and get user information (res.data)
  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };

  //update currentUser when it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  //send props to all children od authContext Provider
  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
