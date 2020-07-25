import { RestaurantInfo } from 'types/RestaurantInfo'
import { MealInfo } from 'types/MealInfo'
import { Action, ActionType } from './action'

export interface State {
  restaurantSelected?: RestaurantInfo
  mealsAdded: MealInfo[]
  mealsQuantity: { [mealId: string]: number }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_NEW_RESTAURANT_MEAL: {
      const { restaurant, meal } = action.payload
      return {
        restaurantSelected: restaurant,
        mealsAdded: [meal],
        mealsQuantity: { [meal.id]: 1 },
      }
    }

    case ActionType.ADD_MEAL: {
      const { meal } = action.payload
      if (state.mealsAdded.find((addedMeal) => addedMeal.id === meal.id)) {
        return {
          ...state,
          mealsQuantity: {
            ...state.mealsQuantity,
            [meal.id]: state.mealsQuantity[meal.id] + 1,
          },
        }
      } else {
        return {
          ...state,
          mealsAdded: [...state.mealsAdded, meal],
          mealsQuantity: { ...state.mealsQuantity, [meal.id]: 1 },
        }
      }
    }

    case ActionType.REMOVE_MEAL: {
      const { meal } = action.payload
      if (state.mealsQuantity[meal.id] === 1) {
        // to delete the key, create a copy of the previous mealsQuanity
        // and then call delete to make sure that you are not mutating
        // the previous state directly
        const updatedMealsQuantity = { ...state.mealsQuantity }
        delete updatedMealsQuantity[meal.id]
        const updatedMeals = state.mealsAdded.filter(
          (addedMeal) => addedMeal.id !== meal.id,
        )
        return {
          restaurantSelected:
            updatedMeals.length === 0 ? undefined : state.restaurantSelected,
          mealsAdded: updatedMeals,
          mealsQuantity: updatedMealsQuantity,
        }
      } else {
        return {
          ...state,
          mealsQuantity: {
            ...state.mealsQuantity,
            [meal.id]: state.mealsQuantity[meal.id] - 1,
          },
        }
      }
    }

    case ActionType.RESET_CART: {
      return {
        restaurantSelected: undefined,
        mealsAdded: [],
        mealsQuantity: {},
      }
    }

    case ActionType.SET_CART: {
      return {
        ...action.payload,
      }
    }

    default: {
      return state
    }
  }
}
