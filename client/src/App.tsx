import React from 'react'
import { Switch } from 'react-router-dom'
import Auth from 'components/Auth'
import Apollo from 'components/Apollo'
import Route from 'components/Route'
import AuthScene from 'pages/Auth'
import Home from 'pages/Home'
import OwnerDashboard from 'pages/OwnerDashboard'
import RestaurantOnboarding from 'pages/RestaurantOnboarding'
import Restaurants from 'pages/Restaurants'

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

          {/* Owner Routes */}
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

          {/* Customer routes */}
          <Route path="/restaurants" protectedRoute component={Restaurants} />
        </Switch>
      </Apollo>
    </Auth>
  )
}

export default App
