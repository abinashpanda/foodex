import React from 'react'
import { OrderInfo } from 'types/OrderInfo'
import clsx from 'clsx'
import { orderBy } from 'lodash-es'
import { StatusInfo } from 'types/StatusInfo'
import moment from 'moment'
import { getImageUrl } from 'utils/image'
import MarkReceivedButton from 'components/MarkReceivedButton'
import ReorderButton from 'components/ReorderButton'
import { getStatusName } from 'utils/status'

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

  const showActionButton =
    orderStatuses[0]?.status === 'DELIVERED' ||
    orderStatuses[0]?.status === 'RECEIVED'

  return (
    <div
      className={clsx('bg-white p-4 rounded-md shadow space-y-4', className)}
      style={style}
    >
      <div className="flex items-center">
        {restaurant ? (
          <>
            {restaurant.images?.[0]?.url ? (
              <img
                src={getImageUrl(restaurant.images[0].url)}
                alt={restaurant.name}
                className="object-cover w-20 h-20 mr-4 rounded-md md:block"
              />
            ) : null}
            <div>
              <div className="text-base font-medium text-gray-800">
                {restaurant.name}
              </div>
              <div className="text-xs text-gray-500">{restaurant.location}</div>
            </div>
          </>
        ) : null}
        <div className="flex-1" />
        <div className="space-y-2 text-right">
          <div className="font-medium text-right text-gray-900">
            ₹{order?.price ?? 0}
          </div>
          <div className="space-x-1 text-xs text-right text-gray-500">
            <span className="font-medium text-green-500">
              {getStatusName(orderStatuses[0].status)}
            </span>
            <span>|</span>
            <span>
              {moment(orderStatuses[0].createdAt).format('Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
      {showActionButton ? (
        <>
          <div className="border-b" />
          {orderStatuses[0].status === 'DELIVERED' ? (
            <MarkReceivedButton
              order={order}
              className="h-8 leading-none"
              type="default"
            />
          ) : null}
          {orderStatuses[0].status === 'RECEIVED' ? (
            <ReorderButton
              order={order}
              className="h-8 leading-none"
              type="default"
            />
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default OrderCard
