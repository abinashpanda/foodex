import React from 'react'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { MealInfo } from 'types/MealInfo'
import { Link } from 'react-router-dom'
import { getImageUrl } from 'utils/image'
import AddToCartButton from 'components/AddToCartButton'
import clsx from 'clsx'

interface Props {
  restaurant: RestaurantInfo
  orderItems: { meal: MealInfo; quantity: number }[]
  totalCost: number
  editable?: boolean
  className?: string
  style?: React.CSSProperties
}

const ItemsOrdered: React.FC<Props> = ({
  restaurant,
  orderItems,
  totalCost,
  editable,
  className,
  style,
}) => {
  return (
    <div className={clsx('p-4 rounded-md shadow', className)} style={style}>
      <Link
        to={`/restaurants/${restaurant.id}`}
        className="flex mb-4 space-x-4"
      >
        {restaurant.images?.[0]?.url ? (
          <img
            src={getImageUrl(restaurant.images[0].url)}
            alt={restaurant.name}
            className="object-cover w-16 h-16 rounded-md"
          />
        ) : null}
        <div>
          <div className="text-base font-medium text-gray-800">
            {restaurant.name}
          </div>
          <div className="text-xs text-gray-500">{restaurant.location}</div>
        </div>
      </Link>
      <div className="mb-4 text-xs font-medium tracking-wider text-green-500 uppercase">
        Items Ordered
      </div>
      <div className="mb-4 space-y-4">
        {/* meals details */}
        {orderItems.map(({ meal, quantity }) => (
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
            {editable ? (
              <AddToCartButton meal={meal} restaurant={restaurant} />
            ) : null}
            <div className="w-16 text-right">₹{meal.price * quantity}</div>
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

export default ItemsOrdered
