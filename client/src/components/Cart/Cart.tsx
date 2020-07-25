import React, { useCallback, useReducer, useEffect } from 'react'
import CartContext from 'contexts/CartContext'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { MealInfo } from 'types/MealInfo'
import { Modal } from 'antd'
import CartDetail from './components/CartDetail'
import { reducer } from './reducer'
import { ActionType } from './action'

const getDataFromLocalStorage = <T extends any>(
  key: string,
  initialValue: T,
): T => {
  // check if it browser or not
  if (window && window.localStorage) {
    const data = window.localStorage.getItem(key)
    if (data) {
      return JSON.parse(data) as T
    }
    return initialValue
  }

  return initialValue
}

const Cart: React.FC = ({ children }) => {
  const [
    { restaurantSelected, mealsAdded, mealsQuantity },
    dispatch,
  ] = useReducer(reducer, {
    restaurantSelected: getDataFromLocalStorage('cart-restaurant', undefined),
    mealsAdded: getDataFromLocalStorage('cart-meals-added', []),
    mealsQuantity: getDataFromLocalStorage('cart-meals-quantity', {}),
  })

  useEffect(() => {
    window.localStorage.setItem(
      'cart-restaurant',
      restaurantSelected ? JSON.stringify(restaurantSelected) : '',
    )
    window.localStorage.setItem('cart-meals-added', JSON.stringify(mealsAdded))
    window.localStorage.setItem(
      'cart-meals-quantity',
      JSON.stringify(mealsQuantity),
    )
  }, [mealsAdded, mealsQuantity, restaurantSelected])

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
