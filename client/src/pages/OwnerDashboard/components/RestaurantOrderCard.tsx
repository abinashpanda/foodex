import React from 'react'
import { OrderInfo } from 'types/OrderInfo'
import OrderCard from 'components/OrderCard'

interface Props {
  order: OrderInfo
  className?: string
  style?: React.CSSProperties
}

const RestaurantOrderCard: React.FC<Props> = ({ order, className, style }) => {
  return <OrderCard order={order} className={className} style={style} />
}

export default RestaurantOrderCard
