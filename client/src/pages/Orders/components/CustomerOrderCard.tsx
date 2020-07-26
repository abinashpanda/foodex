import React from 'react'
import { OrderInfo } from 'types/OrderInfo'
import { orderBy } from 'lodash-es'
import { StatusInfo } from 'types/StatusInfo'
import moment from 'moment'
import MarkReceivedButton from 'components/MarkReceivedButton'
import ReorderButton from 'components/ReorderButton'
import OrderCard from 'components/OrderCard'

interface Props {
  order: OrderInfo
  className?: string
  style?: React.CSSProperties
}

const CustomerOrderCard: React.FC<Props> = ({ order, className, style }) => {
  const { statuses } = order

  const orderStatuses = orderBy(
    statuses as StatusInfo[],
    (status) => moment(status.createdAt).valueOf(),
    'desc',
  )

  const actionButton =
    orderStatuses[0].status === 'DELIVERED' ? (
      <MarkReceivedButton
        order={order}
        className="h-8 leading-none"
        type="default"
      />
    ) : orderStatuses[0].status === 'RECEIVED' ? (
      <ReorderButton
        order={order}
        className="h-8 leading-none"
        type="default"
      />
    ) : undefined

  return (
    <OrderCard
      order={order}
      actions={actionButton ? [actionButton] : undefined}
      className={className}
      style={style}
    />
  )
}

export default CustomerOrderCard
