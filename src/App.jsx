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

  const register = async(email, password, otherDetails) => {{
    try {
      const user = await firebaseApp.registerWithEmail(email, password, otherDetails)
      if(!user){
        console.error("Registration failed")
        return;
      }
      setUser(user);
      navigate("/");
      
    } catch (error) {
      console.error("Registration failed!", error)
      return;
    }
  }}

  const login = async (provider, email="", password="") => {
    try {
      let currentUser;

      switch (provider) {
        case "google": {currentUser = await firebaseApp.loginWithGoogle(); break}; 
        case "facebook": {currentUser = await firebaseApp.loginWithFacebook(); break};
        case "github": {currentUser = await firebaseApp.loginWithGithub(); break};
        case "email": {currentUser = await firebaseApp.loginWithEmail(email, password); break};
        default: {currentUser = null};   
      }

      if (!currentUser) {
        console.log("Sign-in failed");
        return;
      }
      setUser(currentUser);
      console.log(currentUser)
      setIsLoggedIn(true);
      navigate("/");

    } catch (error) {
      console.error("Login failed", error);
      return;
    }
  };

  return (
    <AuthProvider value={{ user, isLoggedIn, login, register }}>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </AuthProvider>
  );
}
