import React, { useContext, useCallback } from 'react'
import CartContext from 'contexts/CartContext'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { MealInfo } from 'types/MealInfo'
import { Button } from 'antd'

interface Props {
  restaurant: RestaurantInfo
  meal: MealInfo
  className?: string
  style?: React.CSSProperties
}

const AddToCartButton: React.FC<Props> = ({
  restaurant,
  meal,
  className,
  style,
}) => {
  const { mealsQuantity, addMeal, removeMeal } = useContext(CartContext)

  const handleAddMeal = useCallback(() => {
    addMeal(meal, restaurant)
  }, [addMeal, meal, restaurant])

  const handleRemoveMeal = useCallback(() => {
    removeMeal(meal)
  }, [meal, removeMeal])

  return (
    <div className={className} style={style}>
      {mealsQuantity[meal.id] ? (
        <div className="flex items-center space-x-2">
          <Button onClick={handleAddMeal} size="small" shape="circle">
            +
          </Button>
          <span className="text-sm font-medium text-gray-800">
            {mealsQuantity[meal.id]}
          </span>
          <Button onClick={handleRemoveMeal} size="small" shape="circle">
            -
          </Button>
        </div>
      ) : (
        <Button onClick={handleAddMeal} className="h-8 leading-none">
          Add
        </Button>
      )}
    </div>
  )
}

export default AddToCartButton
