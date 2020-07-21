import React, { useContext } from 'react'
import AuthContext from 'contexts/AuthContext'
import { Redirect } from 'react-router-dom'

const Home = () => {
  const { user } = useContext(AuthContext)

  if (user?.type === 'RESTAURANT_OWNER') {
    return <Redirect to={{ pathname: '/owner-dashboard' }} />
  }

  if (user?.type === 'CUSTOMER') {
    return <Redirect to={{ pathname: '/restaurants' }} />
  }

  return null
}

export default Home
