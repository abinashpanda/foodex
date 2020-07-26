import React, { useCallback } from 'react'
import { OrderInfo } from 'types/OrderInfo'
import { useMutation } from '@apollo/client'
import {
  MarkOrderReceived,
  MarkOrderReceivedVariables,
} from 'types/MarkOrderReceived'
import { MARK_ORDER_RECEIVED_MUTATION } from 'queries/status'
import { Button } from 'antd'
import { ORDER_QUERY } from 'queries/order'

interface Props
  extends Omit<React.ComponentProps<typeof Button>, 'onClick' | 'loading'> {
  order: OrderInfo
}

const MarkReceivedButton: React.FC<Props> = ({ order, ...restProps }) => {
  const [markOrderReceivedMutation, { loading }] = useMutation<
    MarkOrderReceived,
    MarkOrderReceivedVariables
  >(MARK_ORDER_RECEIVED_MUTATION, {
    variables: { orderId: order.id },
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
