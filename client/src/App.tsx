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
import RestaurantDetail from 'pages/RestaurantDetail'
import Cart from 'components/Cart'
import Checkout from 'pages/Checkout'
import Orders from 'pages/Orders'
import OrderDetail from 'pages/OrderDetail'

const App = () => {
  return (
    <Auth>
      <Apollo>
        <Cart>
          <Switch>
            <Route
              path={['/login', '/signup', '/reset-password']}
              component={AuthScene}
            />

            {/* Common Pages */}
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
            <Route
              path="/restaurants"
              protectedRoute
              component={Restaurants}
              exact
            />
            <Route
              path="/restaurants/:restaurantId"
              protectedRoute
              component={RestaurantDetail}
            />
            <Route path="/checkout" protectedRoute component={Checkout} />
            <Route
              path="/orders-placed"
              protectedRoute
              component={Orders}
              exact
            />
            <Route
              path="/orders-placed/:orderId"
              protectedRoute
              component={OrderDetail}
              exact
            />
          </Switch>
        </Cart>
      </Apollo>
    </Auth>
  )
}

export default App
