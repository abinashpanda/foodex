import React, { useMemo } from 'react'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { RouteComponentProps, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ORDERS_FOR_RESTAURANT_QUERY } from 'queries/order'
import {
  OrdersForRestaurant,
  OrdersForRestaurantVariables,
} from 'types/OrdersForRestaurant'
import { range } from 'lodash-es'
import { Result } from 'antd'
import { OrderInfo } from 'types/OrderInfo'
import RestaurantOrderCard from './RestaurantOrderCard'

interface Props extends RouteComponentProps {
  restaurant: RestaurantInfo
}

const RestaurantOrders: React.FC<Props> = ({ restaurant }) => {
  const { loading, data, error } = useQuery<
    OrdersForRestaurant,
    OrdersForRestaurantVariables
  >(ORDERS_FOR_RESTAURANT_QUERY, {
    variables: { restaurantId: restaurant.id },
    pollInterval: 30 * 1000, // poll every 30 seconds
  })

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="space-y-4">
          {range(6).map((val) => (
            <div
              className="flex p-4 space-x-4 rounded-md shadow"
              key={val}
              style={{ opacity: 1 - val / 6 }}
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
      if (data.orders?.length) {
        return (
          <div className="space-y-4">
            {data.orders.map((order) => (
              <Link
                key={order?.id}
                className="block"
                to={`/owner-dashboard/orders/${order?.id}`}
              >
                <RestaurantOrderCard order={order as OrderInfo} />
              </Link>
            ))}
          </div>
        )
      }

      return (
        <div className="px-4 py-16">
          <div className="max-w-lg mx-auto mb-8">
            <img
              src={require('images/empty-order.svg')}
              className="w-full"
              alt=""
            />
          </div>
          <div className="text-xl font-semibold text-center text-gray-800">
            You have no orders yet
          </div>
          <div className="mb-4 text-center text-gray-500">
            You can update your menu to attract customers
          </div>
        </div>
      )
    }

    return null
  }, [data, error, loading])

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-600">Orders</h1>
      {content}
    </div>
  )
}

export default RestaurantOrders
