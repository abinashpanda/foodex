import { gql } from '@apollo/client'

export const ADDRESS_INFO_FRAGMENT = gql`
  fragment AddressInfo on DeliveryAddress {
    id
    flat
    landmark
    street
    type
  }
`

export const ADDRESSES_FOR_USER_QUERY = gql`
  query AddressesForUser($userId: String!) {
    deliveryAddresses(where: { user: { id: $userId } }) {
      ...AddressInfo
    }
  }
  ${ADDRESS_INFO_FRAGMENT}
`

export const CREATE_ADDRESS_FOR_USER_MUTATION = gql`
  mutation CreateAddressForUser(
    $userId: ID!
    $flat: String!
    $street: String!
    $landmark: String
    $type: ENUM_DELIVERYADDRESS_TYPE!
  ) {
    createDeliveryAddress(
      input: {
        data: {
          user: $userId
          flat: $flat
          street: $street
          landmark: $landmark
          type: $type
        }
      }
    ) {
      deliveryAddress {
        ...AddressInfo
      }
    }
  }
  ${ADDRESS_INFO_FRAGMENT}
`
