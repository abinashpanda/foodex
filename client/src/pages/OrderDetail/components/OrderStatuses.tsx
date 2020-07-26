import React from 'react'
import { OrderInfo } from 'types/OrderInfo'
import clsx from 'clsx'
import { orderBy } from 'lodash-es'
import { StatusInfo } from 'types/StatusInfo'
import moment from 'moment'
import { Clock, LocationMarker } from 'icons'
import MarkReceivedButton from 'components/MarkReceivedButton'
import ReorderButton from 'components/ReorderButton'
import StatusCard from 'components/StatusCard'

interface Props {
  order: OrderInfo
  className?: string
  style?: React.CSSProperties
}

const OrderStatuses: React.FC<Props> = ({ order, className, style }) => {
  const { statuses, deliveryAddress } = order

  const orderStatuses = orderBy(
    statuses as StatusInfo[],
    (status) => moment(status.createdAt).valueOf(),
    'desc',
  )

  return (
    <div
      className={clsx('p-4 bg-white rounded-md shadow', className)}
      style={style}
    >
      {deliveryAddress ? (
        <>
          <div className="flex items-center mb-4 space-x-2 font-medium text-green-500">
            <LocationMarker className="w-5 h-5" />
            <div>Delivery Address</div>
          </div>
          <div className="mb-4 text-gray-800">
            {[
              deliveryAddress?.flat,
              deliveryAddress?.street,
              deliveryAddress?.landmark,
            ].join(', ')}
          </div>
        </>
      ) : null}

      <div className="flex items-center mb-4 space-x-2 font-medium text-green-500">
        <Clock className="w-5 h-5" />
        <div>Order Status</div>
      </div>
      <div className="space-y-4">
        {orderStatuses.map((status) => (
          <StatusCard status={status} key={status.id} />
        ))}
        {orderStatuses[0].status === 'DELIVERED' ? (
          <MarkReceivedButton className="w-full" order={order} />
        ) : null}
        {orderStatuses[0].status === 'RECEIVED' ? (
          <ReorderButton className="w-full" order={order} />
        ) : null}
      </div>
    </div>
  )
}

export default OrderStatuses
