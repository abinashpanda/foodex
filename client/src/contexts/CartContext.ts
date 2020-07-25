import { createContext } from 'react'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { MealInfo } from 'types/MealInfo'

const CartContext = createContext<{
  restaurantSelected?: RestaurantInfo
  mealsAdded: MealInfo[]
  mealsQuantity: { [id: string]: number }
  addMeal: (meal: MealInfo, restaurant: RestaurantInfo) => void
  removeMeal: (meal: MealInfo) => void
}>({
  mealsAdded: [],
  mealsQuantity: {},
  addMeal: () => {},
  removeMeal: () => {},
})

export default CartContext
