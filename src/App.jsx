import React, { useState } from "react";
import { AuthProvider } from "./context/auth.context";
import firebaseApp from "./config/firebase";
import { redirect, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";

export default function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async (provider) => {
    try {
      let currentUser;

      switch (provider) {
        case "google": {currentUser = await firebaseApp.loginWithGoogle(); break}; 
        case "facebook": {currentUser = await firebaseApp.loginWithFacebook(); break};
        default: {currentUser = null};   
      }

      if (!currentUser) {
        console.log("Sign-in failed");
        return;
      }
      setUser(currentUser);
      setIsLoggedIn(true);
      navigate("/");

    } catch (error) {
      console.error("Login failed", error);
      return;
    }
  };



  
  return (
    <AuthProvider value={{ user, isLoggedIn, login }}>
      <Home />
    </AuthProvider>
  );
}
