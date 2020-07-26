import React from 'react'
import { OrderInfo } from 'types/OrderInfo'
import clsx from 'clsx'
import { orderBy } from 'lodash-es'
import { StatusInfo } from 'types/StatusInfo'
import moment from 'moment'
import { Clock } from 'icons'
import { getStatusName } from 'utils/status'
import MarkReceivedButton from 'components/MarkReceivedButton'
import ReorderButton from 'components/ReorderButton'

interface Props {
  order: OrderInfo
  className?: string
  style?: React.CSSProperties
}

const OrderStatuses: React.FC<Props> = ({ order, className, style }) => {
  const { statuses } = order

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
      <div className="flex items-center mb-4 space-x-2 font-medium text-green-500">
        <Clock className="w-5 h-5" />
        <div>Order Status</div>
      </div>
      <div className="space-y-4">
        {orderStatuses.map((status) => (
          <div key={status.id} className="p-3 rounded-md shadow">
            <div className="font-medium text-gray-800">
              {getStatusName(status.status)}
            </div>
            <div className="text-xs text-gray-500">
              {moment(status.createdAt).format('Do MMM, YYYY | hh:mm a')}
            </div>
          </div>
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
