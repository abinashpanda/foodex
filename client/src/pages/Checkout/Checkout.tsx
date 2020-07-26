import React, { useContext, useMemo } from 'react'
import AppShell from 'components/AppShell'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import CartContext from 'contexts/CartContext'
import CheckoutCart from './components/CheckoutCart'
import ConfirmOrder from './components/ConfirmOrder'

const Checkout = () => {
  const { mealsAdded } = useContext(CartContext)

  const content = useMemo(() => {
    if (mealsAdded.length === 0) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center max-w-screen-lg px-4 mx-auto">
          <div className="max-w-lg mx-auto mb-8">
            <img
              src={require('../../images/empty-order.svg')}
              className="w-full"
              alt=""
            />
          </div>
          <div className="text-xl font-semibold text-center text-gray-800">
            Your cart is empty
          </div>
          <div className="mb-4 text-center text-gray-500">
            You can go to home page to view more restaurants
          </div>
          <Link to="/">
            <Button type="primary">See Restaurants Near You</Button>
          </Link>
        </div>
      )
    }

    return (
      <div className="px-4">
        <div className="grid items-start max-w-screen-lg grid-cols-1 gap-4 py-4 mx-auto md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-2">
            <CheckoutCart />
          </div>
          <div className="col-span-1">
            <ConfirmOrder />
          </div>
        </div>
      </div>
    )
  }, [mealsAdded.length])

  return <AppShell>{content}</AppShell>
}

export default Checkout
