import React, { useCallback } from 'react'
import { OrderInfo } from 'types/OrderInfo'
import { useMutation } from '@apollo/client'
import { UPDATE_ORDER_STATUS_MUTATION } from 'queries/status'
import { Button } from 'antd'
import { ORDER_QUERY } from 'queries/order'
import {
  UpdateOrderStatus,
  UpdateOrderStatusVariables,
} from 'types/UpdateOrderStatus'
import { ENUM_ORDERSTATUS_STATUS } from 'types/globalTypes'

interface Props
  extends Omit<React.ComponentProps<typeof Button>, 'onClick' | 'loading'> {
  order: OrderInfo
}

const MarkReceivedButton: React.FC<Props> = ({ order, ...restProps }) => {
  const [markOrderReceivedMutation, { loading }] = useMutation<
    UpdateOrderStatus,
    UpdateOrderStatusVariables
  >(UPDATE_ORDER_STATUS_MUTATION, {
    variables: { orderId: order.id, status: ENUM_ORDERSTATUS_STATUS.RECEIVED },
    refetchQueries: () => [
      { query: ORDER_QUERY, variables: { orderId: order.id } },
    ],
  })

  const handleClick = useCallback(() => {
    markOrderReceivedMutation()
  }, [markOrderReceivedMutation])

  return (
    <Button
      type="primary"
      htmlType="button"
      {...restProps}
      loading={loading}
      onClick={handleClick}
    >
      Received Order
    </Button>
  )
}

export default MarkReceivedButton
