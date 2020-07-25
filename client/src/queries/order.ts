import { gql } from '@apollo/client'
import { MEAL_INFO_FRAGMENT } from './meal'
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
    orderItems {
      id
      meal {
        ...MealInfo
      }
      quantity
    }
    statuses {
      ...StatusInfo
    }
  }
  ${MEAL_INFO_FRAGMENT}
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
  ) {
    placeOrder(
      input: {
        data: {
          customer: $customerId
          restaurant: $restaurantId
          price: $price
          meals: $meals
          deliverAddress: $deliveryAddressId
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
    orders(where: { customer: { id: $customerId } }) {
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
