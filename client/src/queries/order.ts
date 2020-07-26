import { gql } from '@apollo/client'
import { ADDRESS_INFO_FRAGMENT } from './address'
import { RESTAURANT_INFO_FRAGMENT } from './restaurant'
import { STATUS_INFO_FRAGMENT } from './status'

export const ORDER_INFO_FRAGMENT = gql`
  fragment OrderInfo on Order {
    id
    price
    customer {
      id
      name
    }
    restaurant {
      ...RestaurantInfo
    }
    deliveryAddress {
      ...AddressInfo
    }
    statuses {
      ...StatusInfo
    }
    billInfo
  }
  ${ADDRESS_INFO_FRAGMENT}
  ${RESTAURANT_INFO_FRAGMENT}
  ${STATUS_INFO_FRAGMENT}
`

export const PLACE_ORDER_MUTATION = gql`
  mutation PlaceOrder(
    $customerId: ID!
    $restaurantId: ID!
    $price: Float!
    $meals: [OrderMealInput!]!
    $deliveryAddressId: ID!
    $billInfo: JSON!
  ) {
    placeOrder(
      input: {
        data: {
          customer: $customerId
          restaurant: $restaurantId
          price: $price
          meals: $meals
          deliveryAddress: $deliveryAddressId
          billInfo: $billInfo
        }
      }
    ) {
      ...OrderInfo
    }
  }
  ${ORDER_INFO_FRAGMENT}
`

export const ORDERS_FOR_CUSTOMER_QUERY = gql`
  query OrdersForCustomer($customerId: String!) {
    orders(where: { customer: { id: $customerId } }, sort: "createdAt:desc") {
      ...OrderInfo
    }
  }
  ${ORDER_INFO_FRAGMENT}
`

export const ORDERS_FOR_RESTAURANT_QUERY = gql`
  query OrdersForRestaurant($restaurantId: String!) {
    orders(
      where: { restaurant: { id: $restaurantId } }
      sort: "createdAt:desc"
    ) {
      ...OrderInfo
    }
  }
  ${ORDER_INFO_FRAGMENT}
`

export const ORDER_QUERY = gql`
  query Order($orderId: ID!) {
    order(id: $orderId) {
      ...OrderInfo
    }
  }
  ${ORDER_INFO_FRAGMENT}
`
