import React from "react";
import { useAuth } from "../../context/auth.context";
export default function Home() {
  const { isLoggedIn, login } = useAuth();
  console.log(isLoggedIn)

  if (!isLoggedIn) {
    return (
      <>
        <p>You're not logged in</p>
        <button onClick={() => login()}>Sign in with Google</button>
      </>
    );
  }

  return (
    <>
    <h1>Hey Buddy! Thanks for logging in</h1>
    </>     
);
}
