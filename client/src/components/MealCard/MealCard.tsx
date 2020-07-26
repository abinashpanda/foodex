import React, { useContext } from 'react'
import { MealInfo } from 'types/MealInfo'
import clsx from 'clsx'
import { getImageUrl } from 'utils/image'
import { Typography } from 'antd'
import { RestaurantInfo } from 'types/RestaurantInfo'
import AddToCartButton from 'components/AddToCartButton'
import AuthContext from 'contexts/AuthContext'
import { User } from 'types/user'

interface Props {
  meal: MealInfo
  restaurant?: RestaurantInfo
  className?: string
  style?: React.CSSProperties
}

const MealCard: React.FC<Props> = ({ meal, restaurant, className, style }) => {
  const { type: userType } = useContext(AuthContext).user as User

  return (
    <div
      className={clsx(
        'overflow-hidden rounded-md shadow bg-white flex flex-row md:flex-col',
        className,
      )}
      style={style}
    >
      <div className="relative w-32 bg-gray-100 md:w-full md:h-32">
        <div className="absolute inset-0">
          {meal.image ? (
            <img
              src={getImageUrl(meal.image.url)}
              alt={meal.name || ''}
              className="object-cover w-full h-full"
            />
          ) : null}
        </div>
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
        <div className="flex items-center justify-between h-8">
          <span className="text-sm font-medium text-gray-400">
            ₹{meal.price}
          </span>
          {userType === 'CUSTOMER' && restaurant ? (
            <AddToCartButton restaurant={restaurant} meal={meal} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default MealCard
