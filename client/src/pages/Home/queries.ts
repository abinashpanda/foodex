import { gql } from '@apollo/client'
import { RESTAURANT_INFO_FRAGMENT } from 'queries/restaurant'

export const RESTAURANT_FOR_OWNER_QUERY = gql`
  query RestaurantForOwner($userId: String!) {
    restaurants(where: { owner: { id: $userId } }) {
      ...RestaurantInfo
    }
  }
  ${RESTAURANT_INFO_FRAGMENT}
`
