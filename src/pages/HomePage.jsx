import React from 'react'
import { useCurrentUser } from '../contexts/CurrentUserContext'

const HomePage = () => {

  const currentUser = useCurrentUser()

  return (
    <div>{currentUser?.username}</div>
    
  )
}

export default HomePage