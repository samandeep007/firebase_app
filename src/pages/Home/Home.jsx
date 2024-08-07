import React from "react";
import { useAuth } from "../../context/auth.context";
export default function Home() {
  const { isLoggedIn, login, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <>
        <p>You're not logged in</p>
        <button onClick={() => login("google")}>Sign in with Google</button>
        <button onClick={() => login("facebook")}>Sign in with Facebook</button>
      </>
    );
  }

  return (
    <>
    <h1>Hey {user.displayName}! Thanks for logging in</h1>
    </>     
);
}
