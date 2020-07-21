import { gql } from '@apollo/client'

export const RESTAURANT_INFO_FRAGMENT = gql`
  fragment RestaurantInfo on Restaurant {
    id
    name
    images {
      url
    }
    cuisines
    location
  }
`
