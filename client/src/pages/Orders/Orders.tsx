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
import { Result } from 'antd'
import { OrderInfo } from 'types/OrderInfo'
import { Link } from 'react-router-dom'
import OrderCard from './components/OrderCard'

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

    if (data && data.orders) {
      return (
        <div className="space-y-4">
          {data.orders?.map((order) => (
            <Link to={`/orders/${order?.id}`} key={order?.id}>
              <OrderCard order={order as OrderInfo} />
            </Link>
          ))}
        </div>
      )
    }

    return null
  }, [data, error, loading])

  return (
    <AppShell>
      <div className="max-w-screen-md py-4 mx-auto">
        <h1 className="mb-6 text-xl font-bold text-gray-600">Orders</h1>
        {content}
      </div>
    </AppShell>
  )
}

export default Orders
