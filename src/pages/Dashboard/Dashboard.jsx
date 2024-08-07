import React from 'react'
import { useAuth } from '../../context/auth.context';

export default function Dashboard() {

    const{user} = useAuth();
 
  return (
    <div>{user?.displayName}</div>
  )
}
