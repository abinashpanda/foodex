import React, { useContext, useCallback, useMemo } from 'react'
import CartContext from 'contexts/CartContext'
import { getImageUrl } from 'utils/image'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const CheckoutCart = () => {
  const {
    restaurantSelected,
    mealsAdded,
    mealsQuantity,
    addMeal,
    removeMeal,
  } = useContext(CartContext)

  const handleAddMeal = useCallback(
    (meal) => () => {
      if (restaurantSelected) {
        addMeal(meal, restaurantSelected)
      }
    },
    [addMeal, restaurantSelected],
  )

  const handleRemoveMeal = useCallback(
    (meal) => () => {
      removeMeal(meal)
    },
    [removeMeal],
  )

  const totalItemsCost = useMemo(
    () =>
      mealsAdded.reduce(
        (acc, meal) => acc + meal.price * mealsQuantity[meal.id],
        0,
      ),
    [mealsAdded, mealsQuantity],
  )

  const deliveryCharges = 0

  return (
    <div className="p-4 rounded-md shadow">
      {restaurantSelected ? (
        <Link
          to={`/restaurants/${restaurantSelected.id}`}
          className="flex mb-4 space-x-4"
        >
          {restaurantSelected.images?.[0]?.url ? (
            <img
              src={getImageUrl(restaurantSelected.images[0].url)}
              alt={restaurantSelected.name}
              className="object-cover w-16 h-16 rounded-md"
            />
          ) : null}
          <div>
            <div className="text-base font-medium text-gray-800">
              {restaurantSelected.name}
            </div>
            <div className="text-xs text-gray-500">
              {restaurantSelected.location}
            </div>
          </div>
        </Link>
      ) : null}
      <div className="mb-4 text-xs font-medium tracking-wider text-green-500 uppercase">
        Items Ordered
      </div>
      <div className="mb-4 space-y-4">
        {mealsAdded.map((meal) => (
          <div key={meal.id} className="flex items-center space-x-4">
            <div>
              <div className="text-sm font-medium text-gray-700">
                {meal.name}
              </div>
              <div className="max-w-sm text-xs text-gray-400 truncate">
                {meal.description}
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex items-center space-x-2">
              <Button onClick={handleAddMeal(meal)} shape="circle" size="small">
                +
              </Button>
              <span className="text-sm font-medium text-gray-800">
                {mealsQuantity[meal.id]}
              </span>
              <Button
                onClick={handleRemoveMeal(meal)}
                shape="circle"
                size="small"
              >
                -
              </Button>
            </div>
            <div className="w-16 text-right">
              ₹{meal.price * mealsQuantity[meal.id]}
            </div>
          </div>
        ))}
        <div className="mb-4 text-xs font-medium tracking-wider text-green-500 uppercase">
          Bill Details
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Items Total</div>
          <div className="w-16 text-right">₹{totalItemsCost}</div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">
            Delivery Charges
          </div>
          <div className="w-16 text-right">₹{deliveryCharges}</div>
        </div>
        <div className="mb-4 border-b" />
        <div className="flex items-center justify-between">
          <div className="text-base font-medium text-gray-900">To Pay</div>
          <div className="w-16 font-medium text-right text-gray-900">
            ₹{totalItemsCost + deliveryCharges}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutCart
