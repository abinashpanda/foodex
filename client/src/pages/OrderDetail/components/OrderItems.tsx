import React from 'react'
import { OrderInfo } from 'types/OrderInfo'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { getImageUrl } from 'utils/image'

interface Props {
  order: OrderInfo
  className?: string
  style?: React.CSSProperties
}

const OrderItems: React.FC<Props> = ({ order, className, style }) => {
  const { restaurant, orderItems } = order

  return (
    <div
      className={clsx('p-4 bg-white rounded-md shadow', className)}
      style={style}
    >
      {restaurant ? (
        <Link
          to={`/restaurants/${restaurant.id}`}
          className="flex mb-4 space-x-4"
        >
          {restaurant.images?.[0]?.url ? (
            <img
              src={getImageUrl(restaurant.images[0].url)}
              alt={restaurant.name}
              className="object-cover w-16 h-16 rounded-md"
            />
          ) : null}
          <div>
            <div className="text-base font-medium text-gray-800">
              {restaurant.name}
            </div>
            <div className="text-xs text-gray-500">
              {restaurant.cuisines.join(', ')}
            </div>
            <div className="text-xs text-gray-500">{restaurant.location}</div>
          </div>
        </Link>
      ) : null}
      {orderItems?.length ? (
        <>
          <div className="mb-4 text-xs font-medium tracking-wider text-green-500 uppercase">
            Items Ordered
          </div>
          <div className="mb-4 space-y-4">
            {orderItems.map((orderItem) => (
              <div key={orderItem?.id} className="flex items-center space-x-4">
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {orderItem?.meal?.name} x {orderItem?.quantity}
                  </div>
                  <div className="w-40 text-xs text-gray-400 truncate lg:w-full lg:max-w-sm">
                    {orderItem?.meal?.description}
                  </div>
                </div>
                <div className="flex-1" />
                <div className="w-16 text-right">
                  ₹{(orderItem?.meal?.price ?? 0) * (orderItem?.quantity ?? 0)}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
      <div className="mb-4 text-xs font-medium tracking-wider text-green-500 uppercase">
        Bill Details
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-700">Items Total</div>
        <div className="w-16 text-right">₹{order?.price ?? 0}</div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-700">
          Delivery Charges
        </div>
        <div className="w-16 text-right">₹0</div>
      </div>
      <div className="mb-4 border-b" />
      <div className="flex items-center justify-between">
        <div className="text-base font-medium text-gray-900">Paid</div>
        <div className="w-16 font-medium text-right text-gray-900">
          ₹{order?.price ?? 0}
        </div>
      </div>
    </div>
  )
}

export default OrderItems
