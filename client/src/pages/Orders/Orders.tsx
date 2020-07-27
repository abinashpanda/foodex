import React, { useContext, useMemo } from 'react'
import AppShell from 'components/AppShell'
import AuthContext from 'contexts/AuthContext'
import { User } from 'types/user'
import { useQuery } from '@apollo/client'
import {
  OrdersForCustomer,
  OrdersForCustomerVariables,
} from 'types/OrdersForCustomer'
import { ORDERS_FOR_CUSTOMER_QUERY } from 'queries/order'
import { range } from 'lodash-es'
import { Result, Button } from 'antd'
import { OrderInfo } from 'types/OrderInfo'
import { Link } from 'react-router-dom'
import CustomerOrderCard from './components/CustomerOrderCard'

const Orders = () => {
  const { _id: userId } = useContext(AuthContext).user as User

  const { loading, data, error } = useQuery<
    OrdersForCustomer,
    OrdersForCustomerVariables
  >(ORDERS_FOR_CUSTOMER_QUERY, {
    variables: {
      customerId: userId,
    },
  })

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="space-y-4">
          {range(5).map((val) => (
            <div
              className="flex p-4 space-x-4 rounded-md shadow"
              key={val}
              style={{ opacity: 1 - val / 5 }}
            >
              <div className="w-20 h-20 rounded-md skeleton" />
              <div className="flex-1 space-y-4">
                <div className="w-7/12 h-4 skeleton" />
                <div className="w-4/12 h-4 skeleton" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (error) {
      return <Result status="warning" subTitle={error.message} />
    }

    if (data) {
      if (!data.orders?.length) {
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center max-w-screen-lg px-4 mx-auto">
            <div className="max-w-lg mx-auto mb-8">
              <img
                src={require('images/empty-order.svg')}
                className="w-full"
                alt=""
              />
            </div>
            <div className="text-xl font-semibold text-center text-gray-800">
              Your have not ordered yet
            </div>
            <div className="mb-4 text-center text-gray-500">
              You can go to home page to view more restaurants
            </div>
            <Link to="/">
              <Button type="primary">See Restaurants Near You</Button>
            </Link>
          </div>
        )
      }

      return (
        <>
          <h1 className="mb-6 text-xl font-bold text-gray-600">Orders</h1>
          <div className="space-y-4">
            {data.orders?.map((order) => (
              <Link
                to={`/orders-placed/${order?.id}`}
                key={order?.id}
                className="block"
              >
                <CustomerOrderCard order={order as OrderInfo} />
              </Link>
            ))}
          </div>
        </>
      )
    }

    return null
  }, [data, error, loading])

  return (
    <AppShell>
      <div className="px-4">
        <div className="max-w-screen-md py-4 mx-auto">{content}</div>
      </div>
    </AppShell>
  )
}

export default Orders
