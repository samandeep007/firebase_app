import React, { useState } from 'react'
import { AuthProvider } from './context/auth.context'
import firebaseApp from './config/firebase';

export default function App() {

  const[user, setUser] = useState({});
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <AuthProvider value={{isLoggedIn, user}}>

    </AuthProvider>
  )
}
