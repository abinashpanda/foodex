import React, { useCallback, useContext } from 'react'
import { OrderInfo } from 'types/OrderInfo'
import clsx from 'clsx'
import { orderBy, capitalize } from 'lodash-es'
import { StatusInfo } from 'types/StatusInfo'
import moment from 'moment'
import { getImageUrl } from 'utils/image'
import { Button } from 'antd'
import { useMutation } from '@apollo/client'
import {
  MarkOrderReceived,
  MarkOrderReceivedVariables,
} from 'types/MarkOrderReceived'
import { MARK_ORDER_RECEIVED_MUTATION } from 'queries/status'
import { ORDER_QUERY } from 'queries/order'
import CartContext from 'contexts/CartContext'
import { useHistory } from 'react-router-dom'
import { MealInfo } from 'types/MealInfo'
import { RestaurantInfo } from 'types/RestaurantInfo'

interface Props {
  order: OrderInfo
  className?: string
  style?: React.CSSProperties
}

const OrderCard: React.FC<Props> = ({ order, className, style }) => {
  const { restaurant, statuses } = order

  const orderStatuses = orderBy(
    statuses as StatusInfo[],
    (status) => moment(status.createdAt).valueOf(),
    'desc',
  )

  const [markOrderReceived, { loading: markingOrderReceived }] = useMutation<
    MarkOrderReceived,
    MarkOrderReceivedVariables
  >(MARK_ORDER_RECEIVED_MUTATION, {
    variables: { orderId: order.id },
    refetchQueries: () => [
      { query: ORDER_QUERY, variables: { orderId: order.id } },
    ],
  })

  const handleOrderReceived = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      markOrderReceived()
    },
    [markOrderReceived],
  )

  const { setCart } = useContext(CartContext)

  const history = useHistory()

  const handleReorderItems = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (order) {
        const { restaurant, orderItems } = order
        const mealsAdded =
          orderItems?.map((orderItem) => orderItem?.meal as MealInfo) ?? []
        const mealsQuantity =
          orderItems?.reduce(
            (acc, orderItem) => ({
              ...acc,
              [(orderItem?.meal as MealInfo).id]: orderItem?.quantity ?? 0,
            }),
            {},
          ) ?? {}
        setCart(restaurant as RestaurantInfo, mealsAdded, mealsQuantity)
        history.push('/checkout')
      }
    },
    [history, order, setCart],
  )

  return (
    <div
      className={clsx(
        'bg-white p-4 rounded-md shadow flex space-x-4 items-center',
        className,
      )}
      style={style}
    >
      {restaurant ? (
        <>
          {restaurant.images?.[0]?.url ? (
            <img
              src={getImageUrl(restaurant.images[0].url)}
              alt={restaurant.name}
              className="object-cover w-20 h-20 rounded-md"
            />
          ) : null}
          <div>
            <div className="text-base font-medium text-gray-800">
              {restaurant.name}
            </div>
            <div className="text-xs text-gray-500">{restaurant.location}</div>
          </div>
          <div className="flex-1" />
          <div className="space-y-2 text-right">
            <div className="font-medium text-right text-gray-900">
              ₹{order?.price ?? 0}
            </div>
            <div className="space-x-1 text-xs text-right text-gray-500">
              <span className="font-medium text-green-500">
                {orderStatuses[0].status
                  .split('_')
                  .map((val) => capitalize(val))
                  .join(' ')}{' '}
              </span>
              <span>
                |{' '}
                {moment(orderStatuses[0].createdAt).format(
                  'Do MMM YYYY, hh:mm a',
                )}
              </span>
            </div>
            {orderStatuses[0].status === 'DELIVERED' ? (
              <Button
                type="primary"
                onClick={handleOrderReceived}
                loading={markingOrderReceived}
                className="h-8 leading-none"
              >
                Order Received
              </Button>
            ) : null}
            {orderStatuses[0].status === 'RECEIVED' ? (
              <Button
                type="primary"
                onClick={handleReorderItems}
                className="h-8 leading-none"
              >
                Reorder Items
              </Button>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default OrderCard
