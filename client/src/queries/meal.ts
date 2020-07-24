import { gql } from '@apollo/client'

export const MEAL_INFO_FRAGMENT = gql`
  fragment MealInfo on Meal {
    id
    name
    description
    price
    image {
      id
      url
    }
    restaurant {
      id
    }
  }
`

export const MEALS_FOR_RESTAURANT_QUERY = gql`
  query MealsForRestaurant($restaurantId: String!) {
    meals(where: { restaurant: { id: $restaurantId } }) {
      ...MealInfo
    }
  }
  ${MEAL_INFO_FRAGMENT}
`

export const CREATE_MEAL_MUTATION = gql`
  mutation CreateMeal(
    $name: String!
    $description: String
    $price: Float!
    $image: ID
    $restaurantId: ID!
  ) {
    createMeal(
      input: {
        data: {
          name: $name
          description: $description
          price: $price
          image: $image
          restaurant: $restaurantId
        }
      }
    ) {
      meal {
        ...MealInfo
      }
    }
  }
  ${MEAL_INFO_FRAGMENT}
`
