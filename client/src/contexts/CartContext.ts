import { createContext } from 'react'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { MealInfo } from 'types/MealInfo'

const CartContext = createContext<{
  restaurantSelected?: RestaurantInfo
  mealsAdded: MealInfo[]
  mealsQuantity: { [id: string]: number }
  totalItems: number
  totalCost: number
  addMeal: (meal: MealInfo, restaurant: RestaurantInfo) => void
  removeMeal: (meal: MealInfo) => void
  resetCart: () => void
  setCart: (
    restaurant: RestaurantInfo,
    mealsAdded: MealInfo[],
    mealsQuantity: { [id: string]: number },
  ) => void
}>({
  mealsAdded: [],
  mealsQuantity: {},
  totalItems: 0,
  totalCost: 0,
  addMeal: () => {},
  removeMeal: () => {},
  resetCart: () => {},
  setCart: () => {},
})

export default CartContext
