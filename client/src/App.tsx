import React from 'react'
import { Switch } from 'react-router-dom'
import Auth from 'components/Auth'
import Apollo from 'components/Apollo'
import Route from 'components/Route'
import AuthScene from 'pages/Auth'
import Home from 'pages/Home'
import OwnerDashboard from 'pages/OwnerDashboard'
import RestaurantOnboarding from 'pages/RestaurantOnboarding'

const App = () => {
  return (
    <Auth>
      <Apollo>
        <Switch>
          <Route
            path={['/login', '/signup', '/reset-password']}
            component={AuthScene}
          />
          <Route path="/" exact protectedRoute component={Home} />
          <Route
            path="/owner-dashboard"
            protectedRoute
            component={OwnerDashboard}
          />
          <Route
            path="/restaurant-onboarding"
            exact
            protectedRoute
            component={RestaurantOnboarding}
          />
        </Switch>
      </Apollo>
    </Auth>
  )
}

export default App
