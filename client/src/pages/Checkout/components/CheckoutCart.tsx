import React, { useContext } from 'react'
import CartContext from 'contexts/CartContext'
import { getImageUrl } from 'utils/image'
import { Link } from 'react-router-dom'
import AddToCartButton from 'components/AddToCartButton'
import { RestaurantInfo } from 'types/RestaurantInfo'

const CheckoutCart = () => {
  const {
    restaurantSelected,
    mealsAdded,
    mealsQuantity,
    totalCost,
  } = useContext(CartContext)

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
        {/* meals details */}
        {mealsAdded.map((meal) => (
          <div key={meal.id} className="flex items-center space-x-4">
            <div>
              <div className="text-sm font-medium text-gray-700">
                {meal.name}
              </div>
              <div className="w-40 text-xs text-gray-400 truncate lg:w-full lg:max-w-sm">
                {meal.description}
              </div>
            </div>
            <div className="flex-1" />
            <AddToCartButton
              meal={meal}
              restaurant={restaurantSelected as RestaurantInfo}
            />
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
          <div className="w-16 text-right">₹{totalCost}</div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">
            Delivery Charges
          </div>
          <div className="w-16 text-right">₹0</div>
        </div>
        <div className="mb-4 border-b" />
        <div className="flex items-center justify-between">
          <div className="text-base font-medium text-gray-900">To Pay</div>
          <div className="w-16 font-medium text-right text-gray-900">
            ₹{totalCost}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutCart
