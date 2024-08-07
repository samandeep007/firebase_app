import React, { useState } from 'react'
import { AuthProvider } from './context/auth.context'
import firebaseApp from './config/firebase';
import { redirect } from 'react-router-dom';

export default function App() {

  const[user, setUser] = useState({});
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async() => {
    const currentUser = await firebaseApp.signInWithGoogle();
    if(!currentUser){
      console.log("Sign-in failed")
    }
    else {
      setUser(currentUser);
      setIsLoggedIn(true)
      redirect('/home')
    }
  }
 
  return (
   
    <AuthProvider value={{user, isLoggedIn, login}}>
  
  
    </AuthProvider>
  )
}
