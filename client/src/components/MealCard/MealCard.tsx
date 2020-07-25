import React, { useContext, useCallback } from 'react'
import { MealInfo } from 'types/MealInfo'
import clsx from 'clsx'
import { getImageUrl } from 'utils/image'
import { Button, Typography } from 'antd'
import CartContext from 'contexts/CartContext'
import { RestaurantInfo } from 'types/RestaurantInfo'

interface Props {
  meal: MealInfo
  restaurant?: RestaurantInfo
  className?: string
  style?: React.CSSProperties
}

const MealCard: React.FC<Props> = ({ meal, restaurant, className, style }) => {
  const { mealsQuantity, addMeal, removeMeal } = useContext(CartContext)

  const handleAddMeal = useCallback(() => {
    if (restaurant) {
      addMeal(meal, restaurant)
    }
  }, [addMeal, meal, restaurant])

  const handleRemoveMeal = useCallback(() => {
    removeMeal(meal)
  }, [meal, removeMeal])

  return (
    <div
      className={clsx(
        'overflow-hidden rounded-md shadow bg-white flex flex-col',
        className,
      )}
      style={style}
    >
      <div className="w-full h-32 bg-gray-200">
        {meal.image ? (
          <img
            src={getImageUrl(meal.image.url)}
            alt={meal.name || ''}
            className="object-cover w-full h-full"
          />
        ) : null}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="font-medium text-gray-800">{meal.name}</div>
        <Typography.Paragraph
          className="text-xs text-gray-500"
          ellipsis={{ rows: 2 }}
        >
          {meal.description}
        </Typography.Paragraph>
        <div className="flex-1 mb-2" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">
            ₹{meal.price}
          </span>
          {mealsQuantity[meal.id] ? (
            <div className="flex items-center space-x-2">
              <Button onClick={handleAddMeal} className="h-8 leading-none">
                +
              </Button>
              <span className="text-sm font-medium text-gray-800">
                {mealsQuantity[meal.id]}
              </span>
              <Button onClick={handleRemoveMeal} className="h-8 leading-none">
                -
              </Button>
            </div>
          ) : (
            <Button onClick={handleAddMeal} className="h-8 leading-none">
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MealCard
