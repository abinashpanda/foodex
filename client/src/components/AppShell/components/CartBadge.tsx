import React, { useContext } from 'react'
import { ShoppingCart } from 'icons'
import CartContext from 'contexts/CartContext'
import { Badge } from 'antd'
import { Link } from 'react-router-dom'

const CartBadge = () => {
  const { totalItems } = useContext(CartContext)

  return (
    <Badge count={totalItems}>
      <Link to="/checkout">
        <ShoppingCart className="w-6 h-6" />
      </Link>
    </Badge>
  )
}

export default CartBadge
