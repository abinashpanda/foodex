import { gql } from '@apollo/client'

export const STATUS_INFO_FRAGMENT = gql`
  fragment StatusInfo on OrderStatus {
    id
    status
    createdAt
  }
`

export const MARK_ORDER_RECEIVED_MUTATION = gql`
  mutation MarkOrderReceived($orderId: ID!) {
    createOrderStatus(input: { data: { order: $orderId, status: RECEIVED } }) {
      orderStatus {
        ...StatusInfo
      }
    }
  }
  ${STATUS_INFO_FRAGMENT}
`
