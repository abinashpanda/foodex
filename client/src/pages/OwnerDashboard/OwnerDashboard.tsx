import React, { useContext, useMemo } from 'react'
import AppShell from 'components/AppShell'
import { Cuisine, ShoppingCart, Building } from 'icons'
import Route from 'components/Route'
import { Redirect } from 'react-router-dom'
import AuthContext from 'contexts/AuthContext'
import { User } from 'types/user'
import {
  RestaurantForOwner,
  RestaurantForOwnerVariables,
} from 'types/RestaurantForOwner'
import { RESTAURANT_FOR_OWNER_QUERY } from 'queries/restaurant'
import { useQuery } from '@apollo/client'
import { Spin, Result } from 'antd'
import DashboardLink from './components/DashboardLink'
import RestaurantOrders from './components/RestaurantOrders'
import RestaurantOrderDetail from './components/RestaurantOrderDetail'

const OwnerDashboard = () => {
  const { _id: userId } = useContext(AuthContext).user as User

  const { loading, error, data } = useQuery<
    RestaurantForOwner,
    RestaurantForOwnerVariables
  >(RESTAURANT_FOR_OWNER_QUERY, {
    variables: {
      userId,
    },
  })

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="flex justify-center w-full py-8">
          <Spin tip="Loading Restaurant..." />
        </div>
      )
    }

    if (error) {
      return <Result status="warning" subTitle={error.message} />
    }

    if (data && data.restaurants?.[0]) {
      const ownerRestaurant = data.restaurants[0]

      return (
        <div className="grid items-start grid-cols-5 gap-6">
          <div className="col-span-1 p-3 space-y-3 bg-white rounded-md shadow">
            <DashboardLink
              to="/owner-dashboard/orders"
              pathname="/owner-dashboard/orders/:ownerId?"
              icon={ShoppingCart}
              label="Orders"
            />
            <DashboardLink
              to="/owner-dashboard/meals"
              icon={Cuisine}
              label="Meals"
            />
            <DashboardLink
              to="/owner-dashboard/restaurant"
              icon={Building}
              label="Restaurant"
            />
          </div>
          <div className="col-span-4">
            <Route
              path="/owner-dashboard"
              exact
              protectedRoute
              render={() => (
                <Redirect to={{ pathname: '/owner-dashboard/orders' }} />
              )}
            />
            <Route
              path="/owner-dashboard/orders"
              exact
              protectedRoute
              render={(props) => (
                <RestaurantOrders {...props} restaurant={ownerRestaurant} />
              )}
            />
            <Route
              path="/owner-dashboard/orders/:orderId"
              exact
              protectedRoute
              component={RestaurantOrderDetail}
            />
          </div>
        </div>
      )
    }

    return null
  }, [data, error, loading])

  return (
    <AppShell>
      <div className="px-4">
        <div className="max-w-screen-lg py-4 mx-auto">{content}</div>
      </div>
    </AppShell>
  )
}

export default OwnerDashboard
