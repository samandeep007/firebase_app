import React, { useState } from "react";
import { AuthProvider } from "./context/auth.context";
import firebaseApp from "./config/firebase";
import { redirect } from "react-router-dom";
import Home from "./pages/Home/Home";

export default function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    try {
      const currentUser = await firebaseApp.signInWithGoogle();

      if (!currentUser) {
        console.log("Sign-in failed");
        return;
      }

      setUser(currentUser);
      console.error("Login Failed");
      setIsLoggedIn(true);
      redirect("/");

    } catch (error) {
       
        return;
    }
  };

  return (
    <AuthProvider value={{ user, isLoggedIn, setIsLoggedIn, login }}>
      <Home />
    </AuthProvider>
  );
}
