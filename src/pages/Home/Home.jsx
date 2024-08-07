import React from "react";
import { useAuth } from "../../context/auth.context";
import {useNavigate} from 'react-router-dom';
export default function Home() {
  const { isLoggedIn, login, user } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <>
        <p>You're not logged in</p>
        <button onClick={() => login("google")}>Sign in with Google</button>
        <button onClick={() => login("github")}>Sign in with GitHub</button>
      </>
    );
  }

  return (
    <>
    <h1>Hey {user.displayName}! Thanks for logging in</h1>
    <button onClick={() => navigate('/user')}>Go to dashboard</button>
    </>     
);
}
