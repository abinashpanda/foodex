import React, { useContext, useMemo } from 'react'
import AppShell from 'components/AppShell'
import { Cuisine, ShoppingCart, Building, UserCircle } from 'icons'
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
import RouteSelect from './components/RouteSelect'
import Meals from './components/Meals'
import UpdateRestaurant from './components/UpdateRestaurant'
import Customers from './components/Customers'

const dashboardRoutes = [
  {
    label: 'Orders',
    to: '/owner-dashboard/orders',
    pathname: '/owner-dashboard/orders/:orderId?',
    icon: ShoppingCart,
  },
  {
    label: 'Meals',
    to: '/owner-dashboard/meals',
    icon: Cuisine,
  },
  {
    label: 'Restaurant',
    to: '/owner-dashboard/restaurant',
    icon: Building,
  },
  {
    label: 'Customers',
    to: '/owner-dashboard/customers',
    icon: UserCircle,
  },
]

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

    if (data) {
      const ownerRestaurant = data.restaurants?.[0]

      // If the user had not created their restaurant, redirect to
      // restaurant-onboaring page
      if (!ownerRestaurant) {
        return <Redirect to={{ pathname: '/restaurant-onboarding' }} />
      }

      return (
        <div className="grid items-start grid-cols-5 gap-6">
          <div className="hidden col-span-1 p-3 space-y-3 bg-white rounded-md shadow md:block">
            {dashboardRoutes.map((route) => (
              <DashboardLink key={route.to} {...route} />
            ))}
          </div>
          <div className="block col-span-5 md:hidden">
            <RouteSelect routes={dashboardRoutes} />
          </div>
          <div className="col-span-5 md:col-span-4">
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
            <Route
              path="/owner-dashboard/meals"
              exact
              protectedRoute
              render={(props) => (
                <Meals {...props} restaurant={ownerRestaurant} />
              )}
            />
            <Route
              path="/owner-dashboard/restaurant"
              exact
              protectedRoute
              render={(props) => (
                <UpdateRestaurant restaurant={ownerRestaurant} {...props} />
              )}
            />
            <Route
              path="/owner-dashboard/customers"
              exact
              protectedRoute
              render={(props) => (
                <Customers restaurant={ownerRestaurant} {...props} />
              )}
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
