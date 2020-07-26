import React, { useCallback } from 'react'
import { Button } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_ORDER_STATUS_MUTATION } from 'queries/status'
import { ORDER_QUERY } from 'queries/order'
import {
  UpdateOrderStatus,
  UpdateOrderStatusVariables,
} from 'types/UpdateOrderStatus'
import { ENUM_ORDERSTATUS_STATUS } from 'types/globalTypes'

interface Props
  extends Omit<
    React.ComponentProps<typeof Button>,
    'loading | onClick | danger'
  > {
  orderId: string
}

const CancelOrderButton: React.FC<Props> = ({ orderId, ...restProps }) => {
  const [cancelOrderMutation, { loading }] = useMutation<
    UpdateOrderStatus,
    UpdateOrderStatusVariables
  >(UPDATE_ORDER_STATUS_MUTATION, {
    variables: {
      orderId,
      status: ENUM_ORDERSTATUS_STATUS.CANCELLED,
    },
    refetchQueries: () => [{ query: ORDER_QUERY, variables: { orderId } }],
  })

  const handleClick = useCallback(() => {
    cancelOrderMutation()
  }, [cancelOrderMutation])

  return (
    <Button
      type="default"
      {...restProps}
      danger
      loading={loading}
      onClick={handleClick}
    >
      Cancel Order
    </Button>
  )
}

export default CancelOrderButton
