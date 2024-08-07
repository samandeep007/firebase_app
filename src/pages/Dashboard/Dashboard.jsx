import React from 'react'

export default function Dashboard() {

    const{user} = useAuth();
 
  return (
    <div>{user?.displayName}</div>
  )
}
