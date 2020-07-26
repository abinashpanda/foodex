import React from 'react'
import { OrderInfo } from 'types/OrderInfo'
import clsx from 'clsx'
import { LocationMarker, Clock } from 'icons'
import { orderBy } from 'lodash-es'
import { StatusInfo } from 'types/StatusInfo'
import moment from 'moment'
import StatusCard from 'components/StatusCard'
import CancelOrderButton from './CancelOrderButton'
import UpdateOrderStatusButton from './UpdateOrderStatusButton'

interface Props {
  order: OrderInfo
  className?: string
  style?: React.CSSProperties
}

const UpdteOrderStatus: React.FC<Props> = ({ order, className, style }) => {
  const { deliveryAddress, statuses } = order

  const orderStatuses = orderBy(
    statuses as StatusInfo[],
    (status) => moment(status.createdAt).valueOf(),
    'desc',
  )

  // restaurant owner can only cancel order before processing it
  // once the order has been processed, it can't be cancelled anymore
  const canCancelOrder = orderStatuses[0].status === 'PLACED'

  return (
    <div className={clsx('p-4 rounded-md shadow', className)} style={style}>
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
          <StatusCard key={status.id} status={status} />
        ))}

        <UpdateOrderStatusButton order={order} className="w-full" />

        {canCancelOrder ? (
          <CancelOrderButton orderId={order.id} className="w-full" />
        ) : null}
      </div>
    </div>
  )
}

export default UpdteOrderStatus
