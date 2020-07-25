import { RestaurantInfo } from 'types/RestaurantInfo'
import { MealInfo } from 'types/MealInfo'

export enum ActionType {
  ADD_NEW_RESTAURANT_MEAL = 'ADD_NEW_RESTAURANT_MEAL',
  ADD_MEAL = 'ADD_MEAL',
  REMOVE_MEAL = 'REMOVE_MEAL',
}

export interface AddNewRestaurantMealAction {
  type: ActionType.ADD_NEW_RESTAURANT_MEAL
  payload: {
    restaurant: RestaurantInfo
    meal: MealInfo
  }
}

export interface AddMealAction {
  type: ActionType.ADD_MEAL
  payload: {
    meal: MealInfo
  }
}

export interface RemoveMealAction {
  type: ActionType.REMOVE_MEAL
  payload: {
    meal: MealInfo
  }
}

export type Action =
  | AddNewRestaurantMealAction
  | AddMealAction
  | RemoveMealAction