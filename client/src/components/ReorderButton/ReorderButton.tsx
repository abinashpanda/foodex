import React, { useContext, useCallback } from 'react'
import { Button } from 'antd'
import { OrderInfo } from 'types/OrderInfo'
import { useHistory } from 'react-router-dom'
import CartContext from 'contexts/CartContext'
import { MealInfo } from 'types/MealInfo'
import { RestaurantInfo } from 'types/RestaurantInfo'

interface Props extends Omit<React.ComponentProps<typeof Button>, 'onClick'> {
  order: OrderInfo
}

const ReorderButton: React.FC<Props> = ({ order, ...restProps }) => {
  const { setCart } = useContext(CartContext)

  const history = useHistory()

  const handleClick = useCallback(() => {
    const { restaurant, billInfo } = order
    const orderItems = billInfo as { meal: MealInfo; quantity: number }[]
    const mealsAdded =
      orderItems?.map((orderItem) => orderItem?.meal as MealInfo) ?? []
    const mealsQuantity =
      orderItems?.reduce(
        (acc, orderItem) => ({
          ...acc,
          [(orderItem?.meal as MealInfo).id]: orderItem?.quantity ?? 0,
        }),
        {},
      ) ?? {}
    setCart(restaurant as RestaurantInfo, mealsAdded, mealsQuantity)
    history.push('/checkout')
  }, [history, order, setCart])

  return (
    <Button {...restProps} onClick={handleClick}>
      Reorder Items
    </Button>
  )
}

export default ReorderButton
