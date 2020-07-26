import React, { useCallback } from 'react'
import { Button } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_ORDER_STATUS_MUTATION } from 'queries/status'
import { ORDER_QUERY } from 'queries/order'
import {
  UpdateOrderStatus,
  UpdateOrderStatusVariables,
} from 'types/UpdateOrderStatus'
import { OrderInfo } from 'types/OrderInfo'
import { getNextStage } from 'utils/status'
import { orderBy } from 'lodash-es'
import { StatusInfo } from 'types/StatusInfo'
import moment from 'moment'

interface Props
  extends Omit<
    React.ComponentProps<typeof Button>,
    'loading | onClick | danger'
  > {
  order: OrderInfo
}

const UpdateOrderStatusButton: React.FC<Props> = ({ order, ...restProps }) => {
  const [updateOrderStatusMutation, { loading }] = useMutation<
    UpdateOrderStatus,
    UpdateOrderStatusVariables
  >(UPDATE_ORDER_STATUS_MUTATION, {
    refetchQueries: () => [
      { query: ORDER_QUERY, variables: { orderId: order.id } },
    ],
  })

  const orderStatuses = orderBy(
    order.statuses as StatusInfo[],
    (status) => moment(status.createdAt).valueOf(),
    'desc',
  )

  const nextStage = getNextStage(orderStatuses[0].status)

  const handleClick = useCallback(() => {
    if (nextStage) {
      updateOrderStatusMutation({
        variables: {
          orderId: order.id,
          status: nextStage?.status,
        },
      })
    }
  }, [nextStage, order.id, updateOrderStatusMutation])

  if (nextStage) {
    return (
      <Button
        type="primary"
        {...restProps}
        loading={loading}
        onClick={handleClick}
      >
        {nextStage?.label}
      </Button>
    )
  }

  return null
}

export default UpdateOrderStatusButton
