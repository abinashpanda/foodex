import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import {
  RestaurantForOwner,
  RestaurantForOwnerVariables,
} from 'types/RestaurantForOwner'
import { RESTAURANT_FOR_OWNER_QUERY } from 'queries/restaurant'
import AuthContext from 'contexts/AuthContext'
import { Redirect, Switch, Route } from 'react-router-dom'
import AppShell from 'components/AppShell'
import { User } from 'types/user'
import { Cuisine, ShoppingCart, Building, Settings } from 'icons'
import DashboardLink from './components/DashboardLink'
import Meals from './components/Meals'

const OwnerDashboard = () => {
  const { _id: userId } = useContext(AuthContext).user as User

  const { data } = useQuery<RestaurantForOwner, RestaurantForOwnerVariables>(
    RESTAURANT_FOR_OWNER_QUERY,
    { variables: { userId } },
  )

  if (data) {
    if (data.restaurants?.length === 0) {
      return <Redirect to={{ pathname: '/restaurant-onboarding' }} />
    }
  }

  return (
    <AppShell>
      <div className="relative flex items-start max-w-screen-lg mx-auto">
        <div className="sticky top-0 w-48 pt-4">
          <div className="pr-6 space-y-4 border-r border-gray-200">
            <DashboardLink to="/owner-dashboard" icon={Cuisine} label="Meals" />
            <DashboardLink
              to="/owner-dashboard/orders"
              icon={ShoppingCart}
              label="Orders"
            />
            <DashboardLink
              to="/owner-dashboard/restaurant"
              icon={Building}
              label="Restaurant"
            />
            <DashboardLink
              to="/owner-dashboard/settings"
              icon={Settings}
              label="Settings"
            />
          </div>
        </div>
        <div className="flex-1 pt-4 pl-6">
          <Switch>
            <Route path="/owner-dashboard" component={Meals} exact />
          </Switch>
        </div>
      </div>
    </AppShell>
  )
}

export default OwnerDashboard
