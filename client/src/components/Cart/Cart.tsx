import React, { useCallback, useReducer } from 'react'
import CartContext from 'contexts/CartContext'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { MealInfo } from 'types/MealInfo'
import { Modal } from 'antd'
import CartDetail from './components/CartDetail'

interface State {
  restaurantSelected?: RestaurantInfo
  mealsAdded: MealInfo[]
  mealsQuantity: { [mealId: string]: number }
}

enum ActionType {
  ADD_NEW_RESTAURANT_MEAL = 'ADD_NEW_RESTAURANT_MEAL',
  ADD_MEAL = 'ADD_MEAL',
  REMOVE_MEAL = 'REMOVE_MEAL',
}

interface AddNewRestaurantMealAction {
  type: ActionType.ADD_NEW_RESTAURANT_MEAL
  payload: {
    restaurant: RestaurantInfo
    meal: MealInfo
  }
}

interface AddMealAction {
  type: ActionType.ADD_MEAL
  payload: {
    meal: MealInfo
  }
}

interface RemoveMealAction {
  type: ActionType.REMOVE_MEAL
  payload: {
    meal: MealInfo
  }
}

type Action = AddNewRestaurantMealAction | AddMealAction | RemoveMealAction

const initialState: State = {
  restaurantSelected: undefined,
  mealsAdded: [],
  mealsQuantity: {},
}

const reducer = (state: State, action: Action): State => {
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

    default: {
      return state
    }
  }
}

const Cart: React.FC = ({ children }) => {
  const [
    { restaurantSelected, mealsAdded, mealsQuantity },
    dispatch,
  ] = useReducer(reducer, initialState)

  const addMeal = useCallback(
    (meal: MealInfo, restaurant: RestaurantInfo) => {
      const addNewRestaurant = () => {
        dispatch({
          type: ActionType.ADD_NEW_RESTAURANT_MEAL,
          payload: { restaurant, meal },
        })
      }

      if (restaurantSelected) {
        if (restaurantSelected.id === restaurant.id) {
          dispatch({ type: ActionType.ADD_MEAL, payload: { meal } })
        } else {
          Modal.confirm({
            title: 'Items already in cart',
            content:
              'Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant',
            onOk: addNewRestaurant,
            cancelText: 'No',
            okText: 'Yes, Start Afresh',
            icon: null,
          })
        }
      } else {
        addNewRestaurant()
      }
    },
    [restaurantSelected],
  )

  const removeMeal = useCallback((meal: MealInfo) => {
    dispatch({ type: ActionType.REMOVE_MEAL, payload: { meal } })
  }, [])

  return (
    <CartContext.Provider
      value={{
        restaurantSelected,
        mealsAdded,
        mealsQuantity,
        addMeal,
        removeMeal,
      }}
    >
      {children}
      {restaurantSelected ? <CartDetail /> : null}
    </CartContext.Provider>
  )
}

export default Cart
