import React, { useCallback, useEffect, useMemo } from 'react'
import CartContext from 'contexts/CartContext'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { MealInfo } from 'types/MealInfo'
import { Modal } from 'antd'
import usePersistedReducer from 'hooks/usePersistedReducer'
import CartDetail from './components/CartDetail'
import { reducer } from './reducer'
import { ActionType } from './action'

const Cart: React.FC = ({ children }) => {
  const [
    { restaurantSelected, mealsAdded, mealsQuantity },
    dispatch,
  ] = usePersistedReducer({
    key: 'foodex-cart',
    reducer,
    initialState: {
      restaurantSelected: undefined,
      mealsAdded: [],
      mealsQuantity: {},
    },
  })

  const totalCost = useMemo(
    () =>
      mealsAdded.reduce(
        (acc, meal) => acc + meal.price * mealsQuantity[meal.id],
        0,
      ),
    [mealsAdded, mealsQuantity],
  )

  const totalItems = useMemo(
    () => Object.values(mealsQuantity).reduce((acc, val) => acc + val, 0),
    [mealsQuantity],
  )

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
    [dispatch, restaurantSelected],
  )

  const removeMeal = useCallback(
    (meal: MealInfo) => {
      dispatch({ type: ActionType.REMOVE_MEAL, payload: { meal } })
    },
    [dispatch],
  )

  const resetCart = useCallback(() => {
    dispatch({ type: ActionType.RESET_CART })
  }, [dispatch])

  const setCart = useCallback(
    (
      restaurant: RestaurantInfo,
      mealsAdded: MealInfo[],
      mealsQuantity: { [mealId: string]: number },
    ) => {
      const setCart = () => {
        dispatch({
          type: ActionType.SET_CART,
          payload: {
            restaurantSelected: restaurant,
            mealsAdded,
            mealsQuantity,
          },
        })
      }

      if (restaurantSelected && restaurantSelected.id !== restaurant.id) {
        Modal.confirm({
          title: 'Items already in cart',
          content:
            'Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant',
          onOk: setCart,
          cancelText: 'No',
          okText: 'Yes, Start Afresh',
          icon: null,
        })
      } else {
        setCart()
      }
    },
    [dispatch, restaurantSelected],
  )

  return (
    <CartContext.Provider
      value={{
        restaurantSelected,
        mealsAdded,
        mealsQuantity,
        totalItems,
        totalCost,
        addMeal,
        removeMeal,
        resetCart,
        setCart,
      }}
    >
      {children}
      <CartDetail />
    </CartContext.Provider>
  )
}

export default Cart
