import { gql } from '@apollo/client'

export const RESTAURANT_INFO_FRAGMENT = gql`
  fragment RestaurantInfo on Restaurant {
    id
    name
    images {
      url
      id
    }
    cuisines
    location
  }
`

export const RESTAURANT_FOR_OWNER_QUERY = gql`
  query RestaurantForOwner($userId: String!) {
    restaurants(where: { owner: { id: $userId } }) {
      ...RestaurantInfo
    }
  }
  ${RESTAURANT_INFO_FRAGMENT}
`

export const RESTAURANTS_FOR_CUSTOMER_QUERY = gql`
  query RestaurantsForCustomer {
    restaurants {
      ...RestaurantInfo
    }
  }
  ${RESTAURANT_INFO_FRAGMENT}
`

export const CREATE_RESTAURANT_MUTATION = gql`
  mutation CreateRestaurant(
    $name: String!
    $location: String!
    $cuisines: JSON
    $images: [ID]!
    $ownerId: ID!
  ) {
    createRestaurant(
      input: {
        data: {
          name: $name
          location: $location
          cuisines: $cuisines
          images: $images
          owner: $ownerId
        }
      }
    ) {
      restaurant {
        ...RestaurantInfo
      }
    }
  }
  ${RESTAURANT_INFO_FRAGMENT}
`
