import { gql } from '@apollo/client'

export const STATUS_INFO_FRAGMENT = gql`
  fragment StatusInfo on OrderStatus {
    id
    status
    createdAt
  }
`

export const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: ENUM_ORDERSTATUS_STATUS!) {
    createOrderStatus(input: { data: { order: $orderId, status: $status } }) {
      orderStatus {
        ...StatusInfo
      }
    }
  }
  ${STATUS_INFO_FRAGMENT}
`
