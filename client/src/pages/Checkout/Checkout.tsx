import React from 'react'
import AppShell from 'components/AppShell'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const Checkout = () => {
  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center h-full max-w-screen-lg py-4 mx-auto">
        <img
          src={require('../../images/empty-order.svg')}
          className="max-w-lg mx-auto mb-8"
          alt=""
        />
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
    </AppShell>
  )
}

export default Checkout
