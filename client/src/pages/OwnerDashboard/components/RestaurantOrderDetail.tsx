import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Order, OrderVariables } from 'types/Order'
import { ORDER_QUERY } from 'queries/order'
import { range } from 'lodash-es'
import { Result } from 'antd'
import ItemsOrdered from 'components/ItemsOrdered'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { MealInfo } from 'types/MealInfo'
import UpdateOrderStatus from './UpdateOrderStatus'

interface Props extends RouteComponentProps {}

const RestaurantOrderDetail: React.FC<Props> = ({ match: { params } }) => {
  const { orderId } = params as { orderId: string }

  const { loading, data, error } = useQuery<Order, OrderVariables>(
    ORDER_QUERY,
    {
      variables: { orderId },
      pollInterval: 10000,
    },
  )

  if (loading) {
    return (
      <div className="grid items-start grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 p-4 bg-white rounded-md shadow lg:col-span-2">
          <div className="flex mb-4 space-x-4">
            <div className="w-16 h-16 rounded-md skeleton" />
            <div className="flex-1">
              <div className="w-7/12 h-4 mb-4 skeleton" />
              <div className="w-4/12 h-4 skeleton" />
            </div>
          </div>
          <div className="space-y-4">
            {range(6).map((val) => (
              <div
                key={val}
                className="flex items-center justify-between"
                style={{ opacity: 1 - val / 6 }}
              >
                <div className="w-48 h-4 skeleton" />
                <div className="w-16 h-4 skeleton" />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 p-4 space-y-4 bg-white rounded-md shadow">
          {range(6).map((val) => (
            <div
              key={val}
              className="p-3 rounded-md shadow"
              style={{ opacity: 1 - val / 6 }}
            >
              <div className="w-full h-4 mb-2 skeleton" />
              <div className="w-7/12 h-4 skeleton" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <Result status="warning" subTitle={error.message} />
  }

  if (data && data.order) {
    const { billInfo } = data.order
    const orderItems = billInfo as { meal: MealInfo; quantity: number }[]

    return (
      <div className="grid items-start grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          <ItemsOrdered
            restaurant={data.order.restaurant as RestaurantInfo}
            totalCost={data.order.price}
            orderItems={orderItems}
          />
        </div>
        <div className="col-span-1">
          <UpdateOrderStatus order={data.order} />
        </div>
      </div>
    )
  }

  return null
}

export default RestaurantOrderDetail
