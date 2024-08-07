import React from 'react'
import { useAuth } from '../../context/auth.context';

export default function Dashboard() {

    const{user} = useAuth();
 
 

  return (
    <h1>{user.displayName}</h1>
  )
}
