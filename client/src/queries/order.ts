import { gql } from '@apollo/client'
import { MEAL_INFO_FRAGMENT } from './meal'
import { ADDRESS_INFO_FRAGMENT } from './address'
import { RESTAURANT_INFO_FRAGMENT } from './restaurant'

export const ORDER_INFO_FRAGMENT = gql`
  fragment OrderInfo on Order {
    id
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
      meal {
        ...MealInfo
      }
      quantity
    }
    statuses {
      id
      createdAt
      status
    }
  }
  ${MEAL_INFO_FRAGMENT}
  ${ADDRESS_INFO_FRAGMENT}
  ${RESTAURANT_INFO_FRAGMENT}
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
