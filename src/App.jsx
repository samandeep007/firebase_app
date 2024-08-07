import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/auth.context'
import firebaseApp from './config/firebase';

export default function App() {
  const {isLoggedIn} = useAuth();

  const[user, setUser] = useState({});
 
  if(!isLoggedIn){
    return (
      <>
      <p>You are not logged in</p>
      <button onClick={() => firebaseApp.signInWithGoogle()}>Sign in with google</button>
      </>
    )
  }
  return (
   
    <>
   <h1>You are logged in successfully</h1>
  
    </>
  )
}
