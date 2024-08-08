import React, { useState } from "react";
import { AuthProvider } from "./context/auth.context";
import firebaseApp from "./config/firebase";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";


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
        case "github": {currentUser = await firebaseApp.loginWithGithub(); break};
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
      <Navbar/>
      <Outlet/>
      <Footer/>
    </AuthProvider>
  );
}
