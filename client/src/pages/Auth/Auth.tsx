import React, { useContext } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Route from 'components/Route'
import AuthContext from 'contexts/AuthContext'
import Login from './components/Login'
import Signup from './components/Signup'
import ResetPassword from './components/ResetPassword'

const Auth = () => {
  const { user } = useContext(AuthContext)

  if (user) {
    return <Redirect to={{ pathname: '/' }} />
  }

  return (
    <div className="relative flex flex-col w-full h-screen md:flex-row">
      <img
        src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2153&q=80"
        className="object-cover h-48 sm:hidden"
        alt=""
      />
      <div className="flex flex-col justify-center flex-1 flex-shrink-0 w-full h-full p-8 -mt-4 space-y-8 bg-white rounded-tl-lg rounded-tr-lg sm:p-12 sm:w-120 sm:flex-none sm:rounded-tl-none sm:rounded-tr-none sm:mt-0">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/reset-password" component={ResetPassword} />
        </Switch>
      </div>
      <div className="flex-1 hidden sm:block">
        <img
          src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2153&q=80"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
    </div>
  )
}

export default Auth
