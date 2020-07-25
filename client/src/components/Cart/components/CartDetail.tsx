import React, { useContext, useMemo } from 'react'
import { ShoppingCart } from 'icons'
import CartContext from 'contexts/CartContext'
import { Link } from 'react-router-dom'

const CartDetail = () => {
  const { mealsAdded, mealsQuantity, restaurantSelected } = useContext(
    CartContext,
  )

  const totalCost = useMemo(
    () =>
      mealsAdded.reduce(
        (acc, meal) => acc + meal.price * mealsQuantity[meal.id],
        0,
      ),
    [mealsAdded, mealsQuantity],
  )

  const totalItems = useMemo(
    () => Object.values(mealsQuantity).reduce((acc, value) => acc + value, 0),
    [mealsQuantity],
  )

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <Link
        to="/checkout"
        className="flex items-center max-w-screen-lg px-4 py-2 mx-auto space-x-2 text-white bg-green-500 rounded-t-md hover:text-white"
      >
        <div>
          <div className="text-sm font-semibold">
            ₹{totalCost} | {totalItems} {totalItems <= 1 ? 'Item' : 'Items'}
          </div>
          <div className="text-xs text-green-100">
            From {restaurantSelected?.name}
          </div>
        </div>
        <div className="flex-1" />
        <ShoppingCart className="w-6 h-6" />
        <div className="text-xs font-semibold tracking-wide uppercase">
          View Cart
        </div>
      </Link>
    </div>
  )
}

export default CartDetail
