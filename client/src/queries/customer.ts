import { gql } from '@apollo/client'

export const CUSTOMERS_FOR_RESTAURANT_QUERY = gql`
  query CustomersForRestaurant($restaurantId: String!) {
    orders(where: { restaurant: { id: $restaurantId } }) {
      id
      customer {
        id
        name
      }
    }
  }
`

export const BLOCKED_CUSTOMER_INFO_FRAGMENT = gql`
  fragment BlockedCustomerInfo on BlockedUser {
    id
    user {
      id
      name
    }
  }
`

export const BLOCKED_CUSTOMERS_FOR_RESTAURANT_QUERY = gql`
  query BlockedCustomersForRestaurant($restaurantId: String!) {
    blockedUsers(where: { restaurant: { id: $restaurantId } }) {
      ...BlockedCustomerInfo
    }
  }
  ${BLOCKED_CUSTOMER_INFO_FRAGMENT}
`

export const BLOCK_CUSTOMER_MUTATION = gql`
  mutation BlockCustomer($restaurantId: ID!, $customerId: ID!) {
    createBlockedUser(
      input: { data: { restaurant: $restaurantId, user: $customerId } }
    ) {
      blockedUser {
        ...BlockedCustomerInfo
      }
    }
  }
  ${BLOCKED_CUSTOMER_INFO_FRAGMENT}
`

export const UNBLOCK_CUSTOMER_MUTATION = gql`
  mutation UnblockCustomer($blockedUserId: ID!) {
    deleteBlockedUser(input: { where: { id: $blockedUserId } }) {
      blockedUser {
        ...BlockedCustomerInfo
      }
    }
  }
  ${BLOCKED_CUSTOMER_INFO_FRAGMENT}
`
